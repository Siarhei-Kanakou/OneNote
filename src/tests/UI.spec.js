var url = '../index.html',	
	pageName = 'One Note';

casper.test.begin('\tTesting One Note', function (test) {
	casper.start(url, function () {
		this.test.assertHttpStatus(200, pageName + 'is up');
		this.echo('\tHtml is loaded');
	});

	casper.then(function() {
		this.test.assertTitle(pageName, ' Page has correct title');
	});

	casper.then(function() {
		this.echo('\tChecking date output');
		this.test.assertExists('span[id="month"]', pageName + ' has Mounth field');
		this.test.assertExists('span[id="date"]', pageName + ' has Date field');
	});

	casper.then(function() {
		this.echo('\tChecking input elements');
		this.test.assertExists('#createNote', pageName + ' has Create note button');
		this.test.assertElementCount('input[name="daysNdates"]', 7, pageName + ' has 7 navigation buttons');
		this.test.assertExists('#Mon', pageName + ' has Monday navigation button');
		this.test.assertExists('#Tue', pageName + ' has Tuesday navigation button');
		this.test.assertExists('#Wed', pageName + ' has Wednesday navigation button');
		this.test.assertExists('#Thu', pageName + ' has Thursday navigation button');
		this.test.assertExists('#Fri', pageName + ' has Friday navigation button');
		this.test.assertExists('#Sat', pageName + ' has Saturday navigation button');
		this.test.assertExists('#Sun', pageName + ' has Sunday navigation button');
	});

	casper.then(function() {
		this.echo('\tChecking navigation');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Mon').checked;
		}) === false, ' Now Monday button is not checked');
		this.echo('  Clicking Monday button');
		this.click('#Mon');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Mon').checked;
		}), ' Monday button is checked');

		this.echo('  Clicking Tuesday button');
		this.click('#Tue');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Mon').checked;
		}) === false, ' Now Monday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Tue').checked;
		}), ' Tuesday button is checked');		

		this.echo('  Clicking Wednesday button');
		this.click('#Wed');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Tue').checked;
		}) === false, ' Now Tuesday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Wed').checked;
		}), ' Wednesday button is checked');		

		this.echo('  Clicking Thursday button');
		this.click('#Thu');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Wed').checked;
		}) === false, ' Now Wednesday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Thu').checked;
		}), ' Thursday button is checked');		

		this.echo('  Clicking Friday button');
		this.click('#Fri');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Thu').checked;
		}) === false, ' Now Thursday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Fri').checked;
		}), ' Friday button is checked');

		this.echo('  Clicking Saturday button');
		this.click('#Sat');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Fri').checked;
		}) === false, ' Now Friday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Sat').checked;
		}), ' Saturday button is checked');

		this.echo('  Clicking Sunday button');
		this.click('#Sun');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Sat').checked;
		}) === false, ' Now Saturday button is not checked');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('Sun').checked;
		}), ' Sunday button is checked');

		this.echo('\tChecking Create note button');
		this.evaluate(function() {
			var button = document.getElementById('createNote');
			button.addEventListener('click', function(e) {
				e.target.value = 'Clicked';
			})
		});
		this.test.assert(this.evaluate(function() {
			return document.getElementById('createNote').value;
		}) !== 'Clicked', ' Create note button hasn\'t been clicked yet');
		this.echo('  Clicking Create note button');
		this.click('#createNote');
		this.test.assert(this.evaluate(function() {
			return document.getElementById('createNote').value;
		}) === 'Clicked', ' Create note button was clicked');
	});

	casper.run(function() {
		test.done();
	});
});