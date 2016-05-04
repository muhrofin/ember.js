import compile from 'ember-template-compiler/system/compile';
import {
  compile as htmlbarsCompile
} from 'htmlbars-compiler/compiler';
import VERSION from 'ember/version';

import isEnabled from 'ember-metal/features';
if (!isEnabled('ember-glimmer')) {
  // jscs:disable

QUnit.module('ember-htmlbars: compile');

QUnit.test('compiles the provided template with htmlbars', function() {
  var templateString = '{{foo}} -- {{some-bar blah=\'foo\'}}';

  var actual = compile(templateString);
  var expected = htmlbarsCompile(templateString);

  equal(actual.toString(), expected.toString(), 'compile function matches content with htmlbars compile');
});

QUnit.test('calls template on the compiled function', function() {
  var templateString = '{{foo}} -- {{some-bar blah=\'foo\'}}';

  var actual = compile(templateString);

  ok(actual.isTop, 'sets isTop via template function');
  ok(actual.isMethod === false, 'sets isMethod via template function');
});

QUnit.test('includes the current revision in the compiled template', function() {
  var templateString = '{{foo}} -- {{some-bar blah=\'foo\'}}';

  var actual = compile(templateString);

  equal(actual.meta.revision, 'Ember@' + VERSION, 'revision is included in generated template');
});

QUnit.test('the template revision is different than the HTMLBars default revision', function() {
  var templateString = '{{foo}} -- {{some-bar blah=\'foo\'}}';

  var actual = compile(templateString);
  var expected = htmlbarsCompile(templateString);

  ok(actual.meta.revision !== expected.meta.revision, 'revision differs from default');
});

}
