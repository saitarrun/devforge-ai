#!/usr/bin/env node

/**
 * SDLC Workflow — Interactive Menu
 * Makes it easy to remember and execute commands
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.clear();
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║          SDLC Workflow — Command Menu                          ║
║  26 Agents × 43 Skills × 14 Commands × 9 Phases               ║
╚════════════════════════════════════════════════════════════════╝
`);

  console.log('🚀 QUICK START');
  console.log('1. Build feature end-to-end');
  console.log('2. Build with parallel agents (2-3x faster)');
  console.log('');

  console.log('📋 PHASES (Individual)');
  console.log('3. Phase 1: Planning');
  console.log('4. Phase 2: Design');
  console.log('5. Phase 3: Development');
  console.log('6. Phase 4: Testing & Security');
  console.log('7. Phase 5: Deployment');
  console.log('8. Phase 6: Operations');
  console.log('');

  console.log('🔧 SPECIAL OPERATIONS');
  console.log('9. Code Review (PR)');
  console.log('10. Incident Response');
  console.log('11. Retrospective/Postmortem');
  console.log('12. Performance Optimization');
  console.log('13. Tech Debt Management');
  console.log('14. Release Planning');
  console.log('');

  console.log('15. View Help');
  console.log('0. Exit');
  console.log('');

  rl.question('Choose option (0-15): ', (choice) => {
    handleChoice(choice.trim());
  });
}

function handleChoice(choice) {
  let command = '';
  let description = '';

  switch (choice) {
    case '1':
      rl.question('📝 Describe the feature: ', (feature) => {
        console.log(`\n✅ Run this command:\n\n  /sdlc "${feature}"\n`);
        promptNextAction();
      });
      return;

    case '2':
      rl.question('📝 Describe the feature: ', (feature) => {
        console.log(`\n✅ Run this command:\n\n  /sdlc "${feature}" --parallel\n`);
        promptNextAction();
      });
      return;

    case '3':
      rl.question('📝 Describe what to plan: ', (feature) => {
        console.log(`\n✅ Run this command:\n\n  /sdlc-plan "${feature}"\n`);
        promptNextAction();
      });
      return;

    case '4':
      description = 'Phase 2: Design (UX Researcher, UI Designer)';
      command = '/sdlc-design';
      break;

    case '5':
      description = 'Phase 3: Development (Frontend, Backend, Database)';
      command = '/sdlc-dev';
      break;

    case '6':
      description = 'Phase 4: Testing & Security (QA, AppSec, Pen Tester)';
      command = '/sdlc-test';
      break;

    case '7':
      description = 'Phase 5: Deployment (DevOps, Cloud Engineer)';
      command = '/sdlc-deploy';
      break;

    case '8':
      description = 'Phase 6: Operations (SRE, SecOps, Data Engineer)';
      command = '/sdlc-ops';
      break;

    case '9':
      rl.question('🔍 PR number: ', (pr) => {
        console.log(`\n✅ Run this command:\n\n  /sdlc-review --pr ${pr} --with-graph\n`);
        promptNextAction();
      });
      return;

    case '10':
      rl.question('🚨 Severity (SEV1/SEV2/SEV3/SEV4): ', (sev) => {
        rl.question('📝 Incident description: ', (desc) => {
          console.log(`\n✅ Run this command:\n\n  /sdlc-incident ${sev} "${desc}"\n`);
          promptNextAction();
        });
      });
      return;

    case '11':
      description = 'Retrospective: Blameless postmortem with QUANTS metrics';
      command = '/sdlc-retrospective';
      break;

    case '12':
      description = 'Performance: Profiling, benchmarks, optimization';
      command = '/sdlc-optimize';
      break;

    case '13':
      description = 'Tech Debt: Inventory, paydown plan, ROI analysis';
      command = '/sdlc-tech-debt';
      break;

    case '14':
      description = 'Release: Semantic versioning, canary rollout, notes';
      command = '/sdlc-release';
      break;

    case '15':
      showHelp();
      return;

    case '0':
      console.log('\nGoodbye! 👋\n');
      rl.close();
      process.exit(0);

    default:
      console.log('\n❌ Invalid option. Try again.\n');
      setTimeout(showMenu, 1000);
      return;
  }

  if (command) {
    console.log(`\n${description}`);
    console.log(`\n✅ Run this command:\n\n  ${command}\n`);
    promptNextAction();
  }
}

function promptNextAction() {
  rl.question('Copy command? [Enter to continue]: ', () => {
    showMenu();
  });
}

function showHelp() {
  console.clear();
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║                          HELP                                  ║
╚════════════════════════════════════════════════════════════════╝

BASIC WORKFLOW:
  /sdlc "feature"           → Full 6-phase workflow with gates
  /sdlc "feature" --parallel → All agents in parallel (fast)

PHASES (individual):
  /sdlc-plan "feature"      → Phase 1: Planning
  /sdlc-design              → Phase 2: Design
  /sdlc-dev                 → Phase 3: Development
  /sdlc-test                → Phase 4: Testing & Security
  /sdlc-deploy              → Phase 5: Deployment
  /sdlc-ops                 → Phase 6: Operations

SPECIAL:
  /sdlc-review --pr 1       → Code review with parallel reviewers
  /sdlc-incident SEV1 "x"   → Incident response
  /sdlc-retrospective       → Postmortem
  /sdlc-optimize            → Performance optimization
  /sdlc-tech-debt           → Tech debt management
  /sdlc-release             → Release planning

OPTIONS:
  --parallel                → Run agents in parallel (2-3x faster)
  --with-graph              → Include code-review-graph analysis
  --max-workers=N           → Limit parallel agents to N
  --feedback-loops          → Agents respond to each other

QUICK REFERENCE:
  See QUICK_REFERENCE.md for copy-paste examples
  See README.md for detailed documentation
  See CLAUDE.md for agent conventions

APPROVAL GATES:
  After each phase, review output and approve to proceed

TIME ESTIMATES:
  Full workflow sequential: ~120 min
  Full workflow parallel:   ~45 min
  Single phase:             ~10-15 min

`);
  rl.question('Press [Enter] to return to menu: ', () => {
    showMenu();
  });
}

// Start the menu
showMenu();
