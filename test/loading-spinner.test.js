const { createLoadingState, loadBounties, renderBountyList } = require('../src/loading-spinner');

let passed = 0;
let failed = 0;

function assert(name, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) {
    console.log(`  OK ${name}`);
    passed++;
  } else {
    console.log(`  FAIL ${name}`);
    console.log(`     Expected: ${e}`);
    console.log(`     Actual:   ${a}`);
    failed++;
  }
}

async function run() {
  console.log('\nLoading Spinner Tests\n');

  const state = createLoadingState();
  const pending = loadBounties(() => Promise.resolve([{ title: 'Fix parser' }]), state);
  assert('sets loading while API call is pending', state.isLoading, true);
  await pending;
  assert('clears loading after API call completes', state.isLoading, false);
  assert('stores loaded bounties', state.bounties, [{ title: 'Fix parser' }]);

  const loadingMarkup = renderBountyList({ isLoading: true, error: null, bounties: [] });
  assert('renders accessible loading status', loadingMarkup.includes('role="status"'), true);
  assert('renders spinner class while loading', loadingMarkup.includes('loading-spinner'), true);

  const errorState = await loadBounties(() => Promise.reject(new Error('Network failed')));
  assert('clears loading after failed API call', errorState.isLoading, false);
  assert('stores error message', errorState.error, 'Network failed');
  assert('renders error alert', renderBountyList(errorState).includes('role="alert"'), true);

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
