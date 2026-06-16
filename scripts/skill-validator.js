#!/usr/bin/env node

/**
 * Skill Usage Validator
 * Validates that agents invoke their assigned skills during execution
 * Called after agent completes to verify skill application
 */

const fs = require('fs');
const path = require('path');

class SkillValidator {
  constructor(projectDir) {
    this.projectDir = projectDir;
    this.agentsDir = path.join(projectDir, 'agents');
    this.skillsDir = path.join(projectDir, 'skills');
    this.agentSkillMap = this.buildSkillMap();
  }

  /**
   * Build mapping of agent → required skills
   */
  buildSkillMap() {
    const map = {};

    if (!fs.existsSync(this.agentsDir)) {
      return map;
    }

    fs.readdirSync(this.agentsDir).forEach((file) => {
      if (!file.endsWith('.md')) return;

      const agentName = file.replace('.md', '');
      const agentPath = path.join(this.agentsDir, file);
      const content = fs.readFileSync(agentPath, 'utf8');

      // Extract skills from frontmatter
      const skillsMatch = content.match(/^skills:\s*(.+)$/m);
      if (skillsMatch) {
        const skillsStr = skillsMatch[1];
        const skills = skillsStr
          .split(',')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        map[agentName] = skills;
      }
    });

    return map;
  }

  /**
   * Validate agent used all assigned skills
   * @param {string} agentName - Agent name
   * @param {string} agentOutput - Agent execution output/logs
   * @returns {object} Validation result
   */
  validateAgentSkillUsage(agentName, agentOutput) {
    const requiredSkills = this.agentSkillMap[agentName] || [];

    if (requiredSkills.length === 0) {
      return {
        agent: agentName,
        status: 'WARN',
        message: 'No skills defined for this agent',
        requiredSkills: [],
        usedSkills: [],
        missingSkills: [],
      };
    }

    // Check which skills were mentioned in output
    const usedSkills = requiredSkills.filter((skill) => {
      // Look for skill name or explicit invocation patterns
      const patterns = [
        new RegExp(`skill[\\s-]${skill.replace('skill-', '')}`, 'i'),
        new RegExp(`invoking\\s+${skill}`, 'i'),
        new RegExp(`using\\s+${skill}`, 'i'),
        new RegExp(`applying\\s+${skill}`, 'i'),
      ];

      return patterns.some((pattern) => pattern.test(agentOutput));
    });

    const missingSkills = requiredSkills.filter((s) => !usedSkills.includes(s));

    return {
      agent: agentName,
      status: missingSkills.length === 0 ? 'PASS' : 'FAIL',
      requiredSkills,
      usedSkills,
      missingSkills,
      message:
        missingSkills.length === 0
          ? `✓ Agent used all ${requiredSkills.length} required skills`
          : `✗ Agent missing ${missingSkills.length} required skills: ${missingSkills.join(', ')}`,
    };
  }

  /**
   * Validate multiple agents
   * @param {object} agents - Map of {agentName: output}
   * @returns {object} Validation summary
   */
  validatePhaseAgents(agents) {
    const results = {};
    let passCount = 0;
    let failCount = 0;

    Object.entries(agents).forEach(([agentName, output]) => {
      const result = this.validateAgentSkillUsage(agentName, output);
      results[agentName] = result;

      if (result.status === 'PASS') {
        passCount++;
      } else if (result.status === 'FAIL') {
        failCount++;
      }
    });

    return {
      timestamp: new Date().toISOString(),
      totalAgents: Object.keys(agents).length,
      passCount,
      failCount,
      warnCount: Object.keys(agents).length - passCount - failCount,
      results,
      phaseGateStatus: failCount === 0 ? 'PASS' : 'FAIL',
      summary: `${passCount}/${Object.keys(agents).length} agents used all required skills`,
    };
  }

  /**
   * Write validation report
   * @param {string} runDir - Run directory
   * @param {object} validation - Validation result
   */
  writeValidationReport(runDir, validation) {
    const reportPath = path.join(runDir, 'skill-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(validation, null, 2));

    // Also write human-readable version
    const readablePath = path.join(runDir, 'skill-validation-report.md');
    let markdown = `# Skill Usage Validation Report\n\n`;
    markdown += `**Generated**: ${validation.timestamp}\n`;
    markdown += `**Status**: ${validation.phaseGateStatus}\n\n`;
    markdown += `## Summary\n\n`;
    markdown += `- Total Agents: ${validation.totalAgents}\n`;
    markdown += `- Passed (all skills used): ${validation.passCount}\n`;
    markdown += `- Failed (skills missing): ${validation.failCount}\n`;
    markdown += `- Warned (no skills defined): ${validation.warnCount}\n\n`;

    markdown += `## Detailed Results\n\n`;

    Object.entries(validation.results).forEach(([agentName, result]) => {
      markdown += `### ${agentName}\n\n`;
      markdown += `**Status**: ${result.status}\n\n`;
      markdown += `${result.message}\n\n`;

      if (result.requiredSkills.length > 0) {
        markdown += `**Required Skills**:\n`;
        result.requiredSkills.forEach((skill) => {
          const status = result.usedSkills.includes(skill) ? '✓' : '✗';
          markdown += `- ${status} ${skill}\n`;
        });
        markdown += '\n';
      }
    });

    markdown += `\n## Remediation\n\n`;
    markdown += `For agents that failed:\n`;
    markdown += `1. Verify agent explicitly invoked skill in execution\n`;
    markdown += `2. Check agent output for skill methodology application\n`;
    markdown += `3. Ensure skill artifact/output is documented\n`;
    markdown += `4. Re-run agent if skills were not applied\n`;

    fs.writeFileSync(readablePath, markdown);
  }

  /**
   * Check if skill exists
   * @param {string} skillName - Skill name
   * @returns {boolean}
   */
  skillExists(skillName) {
    return fs.existsSync(path.join(this.skillsDir, skillName));
  }

  /**
   * Get all skills for an agent with validation
   * @param {string} agentName - Agent name
   * @returns {object} Skills with validation status
   */
  getAgentSkillsStatus(agentName) {
    const skills = this.agentSkillMap[agentName] || [];
    const skillStatus = {};

    skills.forEach((skill) => {
      skillStatus[skill] = {
        defined: true,
        exists: this.skillExists(skill),
        mandatory: true,
      };
    });

    return skillStatus;
  }
}

// CLI Usage
if (require.main === module) {
  const projectDir = process.cwd();
  const validator = new SkillValidator(projectDir);

  // Example: validate an agent
  if (process.argv.length > 2) {
    const agentName = process.argv[2];
    const output = process.argv[3] || '';

    const result = validator.validateAgentSkillUsage(agentName, output);
    console.log(JSON.stringify(result, null, 2));
  } else {
    console.log('Skill Validator');
    console.log('Usage: node skill-validator.js <agent-name> [output-text]');
    console.log('\nExample:');
    console.log(
      '  node skill-validator.js product-manager "Invoking skill-grill-me..."',
    );
  }
}

module.exports = SkillValidator;
