import { module, test } from 'qunit';
import { setupTest } from 'pokemon-tcg-app/tests/helpers';

module('Unit | Service | pokemon-card-search', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:pokemon-card-search');
    assert.ok(service);
  });
});
