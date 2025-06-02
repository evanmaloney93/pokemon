import { module, test } from 'qunit';
import { setupRenderingTest } from 'pokemon-tcg-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | search-cards', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SearchCards />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <SearchCards>
        template block text
      </SearchCards>
    `);

    assert.dom().hasText('template block text');
  });
});
