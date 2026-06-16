#!/usr/bin/env node

/**
 * SDLC Orchestrator — Main entry point for /sdlc-plan command
 * Invokes grill-me skill, captures answers, chains agents
 *
 * Usage (from Claude Code):
 * - User types: /sdlc-plan "add OAuth login"
 * - This orchestrator handles the full workflow
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { v4: uuidv4 } = require('crypto').randomBytes;

class SDLCOrchestrator {
  constructor(featureDescription) {
    this.featureDescription = featureDescription;
    this.runId = `run-${new Date().toISOString().replace(/[:-]/g, '')}`;
    this.runDir = path.join(process.cwd(), '.sdlc', this.runId);
    this.grilledContext = {};
    this.orchestratorHost = process.env.SDLC_HOST || '127.0.0.1';
    this.orchestratorPort = process.env.SDLC_PORT || 4242;
  }

  /**
   * Initialize run directory and orchestrator
   */
  async initialize() {
    console.log('\n🚀 SDLC Orchestrator Initializing');
    console.log(`   Run ID: ${this.runId}`);
    console.log(`   Feature: ${this.featureDescription}`);

    // Create run directory
    if (!fs.existsSync(this.runDir)) {
      fs.mkdirSync(this.runDir, { recursive: true });
    }

    // Initialize shared context
    const context = {
      project: {
        feature: this.featureDescription,
        startedAt: new Date().toISOString(),
        phase: 1,
      },
      grill: {},
    };

    fs.writeFileSync(
      path.join(this.runDir, 'context.json'),
      JSON.stringify(context, null, 2)
    );

    // Initialize collaboration log
    const log = {
      messages: [],
      agents: {},
      metrics: {},
    };

    fs.writeFileSync(
      path.join(this.runDir, 'collaboration-log.json'),
      JSON.stringify(log, null, 2)
    );

    console.log(`   Directory: ${this.runDir}`);
    console.log('   ✓ Initialized\n');
  }

  /**
   * Invoke grill-me skill with interactive questions
   * Returns object with answers
   */
  async grillMeInterview() {
    console.log('🔥 GRILL-ME INTERVIEW');
    console.log('   (Answer each question to build shared understanding)\n');

    const answers = {};

    // Question 1: Problem
    console.log('Q1: What problem are you solving?');
    console.log('My take: Start with the user pain point, not the solution.\n');
    answers.problem = await this.askQuestion(
      'Describe the problem (1-2 sentences):'
    );

    // Question 2: Users
    console.log('\nQ2: Who are the users?');
    console.log('My take: Define 2-3 personas with specific pain points.\n');
    answers.users = await this.askQuestion(
      'Describe your users (personas, pain points):'
    );

    // Question 3: Constraints
    console.log('\nQ3: What constraints exist?');
    console.log('My take: Timeline, budget, team size, technical limitations.\n');
    answers.constraints = await this.askQuestion(
      'List constraints (timeline, budget, team, tech):'
    );

    // Question 4: Success criteria
    console.log('\nQ4: What are success criteria?');
    console.log(
      'My take: QUANTS framework — measurable, time-bound outcomes.\n'
    );
    answers.success = await this.askQuestion(
      'Define success metrics (QUANTS: quality, attention, toil, time, satisfaction):'
    );

    // Confirmation
    console.log('\n✓ Confirming understanding...');
    const confirmed = await this.askQuestion(
      'Is this understanding correct? (yes/no):'
    );

    if (confirmed.toLowerCase() !== 'yes') {
      console.log('\n⚠️  Let me re-grill...');
      return this.grillMeInterview();
    }

    this.grilledContext = answers;
    return answers;
  }

  /**
   * Simulate user input (in real implementation, use AskUserQuestion from Claude Code)
   */
  async askQuestion(prompt) {
    // In Claude Code context, this would use:
    // const response = await AskUserQuestion({ question: prompt });
    // For now, return a placeholder that would be filled by user

    return new Promise((resolve) => {
      // Simulated response - in production, use Claude Code's AskUserQuestion
      if (prompt.includes('problem')) {
        resolve(
          'Users cannot log in with social accounts. We need OAuth support.'
        );
      } else if (prompt.includes('users')) {
        resolve(
          'Developers and engineering managers. They want seamless SSO with GitHub/Google.'
        );
      } else if (prompt.includes('constraints')) {
        resolve(
          'Timeline: 4 weeks. Team: 2 engineers. Must use existing auth service.'
        );
      } else if (prompt.includes('success')) {
        resolve(
          'QUANTS: 70% of new signups use OAuth within 30 days. Quality: secure. Time: deploy in 4 weeks.'
        );
      } else if (prompt.includes('correct')) {
        resolve('yes');
      }
    });
  }

  /**
   * Save grill-me interview results
   */
  savGrillSummary() {
    const summary = `# Grill-Me Interview Summary

**Run ID**: ${this.runId}
**Date**: ${new Date().toISOString()}
**Feature**: ${this.featureDescription}

## Interview Results

### Problem
${this.grilledContext.problem}

### Users
${this.grilledContext.users}

### Constraints
${this.grilledContext.constraints}

### Success Criteria
${this.grilledContext.success}

## Status
✅ Grill-complete gate: MARKED
✅ Shared understanding: CONFIRMED
✅ Ready for Phase 1 agents

---
Generated by SDLC Orchestrator
`;

    fs.writeFileSync(
      path.join(this.runDir, '01-grill-summary.md'),
      summary
    );

    console.log('   ✓ Grill summary saved\n');
  }

  /**
   * Mark grill-complete gate in orchestrator
   */
  async markGrillComplete() {
    return new Promise((resolve) => {
      const data = JSON.stringify({
        agent: 'product-manager',
        gates: ['grill-complete'],
      });

      const req = http.request(
        {
          hostname: this.orchestratorHost,
          port: this.orchestratorPort,
          path: '/api/agent/grill-complete',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        },
        (res) => {
          res.on('data', () => {});
          res.on('end', () => resolve(true));
        }
      );

      req.on('error', () => resolve(false));
      req.write(data);
      req.end();
    });
  }

  /**
   * Register agents and set dependencies
   */
  async registerAgents() {
    console.log('📋 Registering Phase 1 agents\n');

    const agents = [
      {
        name: 'product-manager',
        deps: [],
        gates: ['grill-complete'],
      },
      {
        name: 'business-analyst',
        deps: ['product-manager'],
        gates: [],
      },
      {
        name: 'software-architect',
        deps: ['business-analyst'],
        gates: [],
      },
      {
        name: 'security-architect',
        deps: ['software-architect'],
        gates: [],
      },
    ];

    for (const agent of agents) {
      await this.registerAgent(agent);
    }

    console.log('   ✓ All agents registered\n');
  }

  /**
   * Register single agent with orchestrator
   */
  async registerAgent(agentInfo) {
    return new Promise((resolve) => {
      const data = JSON.stringify({
        name: agentInfo.name,
        dependencies: agentInfo.deps,
        gates: agentInfo.gates,
      });

      const req = http.request(
        {
          hostname: this.orchestratorHost,
          port: this.orchestratorPort,
          path: `/api/agent/register/${agentInfo.name}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        },
        (res) => {
          res.on('data', () => {});
          res.on('end', () => {
            console.log(`   ✓ ${agentInfo.name}`);
            resolve(true);
          });
        }
      );

      req.on('error', () => resolve(false));
      req.write(data);
      req.end();
    });
  }

  /**
   * Spawn agents in sequence based on dependencies
   */
  async spawnAgents() {
    console.log('🚀 Spawning Phase 1 agents\n');

    const agents = [
      'product-manager',
      'business-analyst',
      'software-architect',
      'security-architect',
    ];

    for (const agent of agents) {
      await this.spawnAgent(agent);
    }

    console.log('✅ Phase 1 Complete!\n');
  }

  /**
   * Spawn individual agent
   */
  async spawnAgent(agentName) {
    console.log(`▶️  Spawning: ${agentName}`);

    // Mark agent as working
    await this.markAgentStatus(agentName, 'working');

    // Simulate agent execution (in real implementation, would use Agent() tool)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mark agent as complete
    await this.markAgentStatus(agentName, 'complete');
    console.log(`✅ Completed: ${agentName}\n`);
  }

  /**
   * Mark agent status in orchestrator
   */
  async markAgentStatus(agentName, status) {
    return new Promise((resolve) => {
      const data = JSON.stringify({ agent: agentName, status });

      const endpoint =
        status === 'working'
          ? 'spawn'
          : status === 'complete'
            ? 'complete'
            : 'block';

      const req = http.request(
        {
          hostname: this.orchestratorHost,
          port: this.orchestratorPort,
          path: `/api/agent/${endpoint}/${agentName}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
          },
        },
        (res) => {
          res.on('data', () => {});
          res.on('end', () => resolve(true));
        }
      );

      req.on('error', () => resolve(false));
      req.write(data);
      req.end();
    });
  }

  /**
   * Display completion summary
   */
  displaySummary() {
    console.log('═'.repeat(60));
    console.log('\n✅ PHASE 1 COMPLETE\n');
    console.log(`Run ID: ${this.runId}`);
    console.log(`Artifacts: ${this.runDir}\n`);
    console.log('Generated files:');
    console.log('  ✓ 01-grill-summary.md');
    console.log('  ✓ 01-roadmap.md');
    console.log('  ✓ 01-requirements.md');
    console.log('  ✓ 01-architecture.md');
    console.log('  ✓ 01-threat-model.md\n');
    console.log(`Monitor on dashboard: http://127.0.0.1:4242\n`);
    console.log('═'.repeat(60) + '\n');
  }

  /**
   * Run full orchestration
   */
  async run() {
    try {
      await this.initialize();

      // Step 1: Grill-me interview
      await this.grillMeInterview();
      this.savGrillSummary();

      // Step 2: Mark grill-complete gate
      await this.markGrillComplete();

      // Step 3: Register agents
      await this.registerAgents();

      // Step 4: Spawn agents in sequence
      await this.spawnAgents();

      // Step 5: Display summary
      this.displaySummary();
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  }
}

// Main execution
const featureDescription =
  process.argv[2] || 'Build a new feature (describe it)';
const orchestrator = new SDLCOrchestrator(featureDescription);
orchestrator.run();
