const requireAll = (requireContext) => { requireContext.keys().map(requireContext); };

require('./setup_tests.ts');
requireAll(require.context('../', true, /test\.ts$/));
