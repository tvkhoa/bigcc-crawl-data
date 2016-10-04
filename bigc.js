var resultObj = {};
var title;
var casper = require('casper').create();
var fs = require('fs');

var targetFile = 'bigc--';

var sni = casper.cli.get(0);
var st = casper.cli.get(1);

function getTitle() {
  return document.querySelector('#ctl00_ctl00_cphBody_cphBody_lblStoreName').innerText.trim().toLowerCase().split(' ').join('_');
}

function getLinks() {
    var result = {};
    var contents = document.querySelectorAll('.popup-content');

    result.links = Array.prototype.map.call(contents, function(e) {
        var link = e.querySelector('.inner img');
        return link.getAttribute('src');
    });

    result.tits = Array.prototype.map.call(contents, function(e) {
        var tit = e.querySelector('.tit');
        return tit.innerText.trim();
    });

    result.prices = Array.prototype.map.call(contents, function(e) {
        var price = e.querySelector('.price');
        return price.innerText.trim();
    });

    result.descs = Array.prototype.map.call(contents, function(e) {
        var desc = e.querySelector('.des');
        return desc.innerText.trim();
    });

    return result;
}

function initSteps(targetFile) {

  casper.thenEvaluate(function() {
      // Click on 1st result link
      document.querySelector('#ctl00_ctl00_cphBody_cphBody_btnLoadMore').click();
  });
  casper.then(function() {
      this.wait(10000, function() {  
      });
  });
  casper.thenEvaluate(function() {
      // Click on 1st result link
      document.querySelector('#ctl00_ctl00_cphBody_cphBody_btnLoadMore').click();
  });
  casper.then(function() {
      this.wait(10000, function() {  
      });
  });
  casper.thenEvaluate(function() {
      // Click on 1st result link
      document.querySelector('#ctl00_ctl00_cphBody_cphBody_btnLoadMore').click();
  });
  casper.then(function() {
      this.wait(10000, function() {  
      });
  });

  casper.then(function() {
    resultObj = this.evaluate(getLinks);
    title = this.evaluate(getTitle);
  });

  casper.then(function() {
    var fileURL = fs.pathJoin(fs.workingDirectory, 'khoathai', targetFile);

    fs.write(fileURL+ '-' + title + '-links.txt', resultObj.links.join('\n'), 'w');
    fs.write(fileURL+ '-' + title +'-tits.txt', resultObj.tits.join('\n'), 'w');
    fs.write(fileURL+ '-' + title +'-prices.txt', resultObj.prices.join('\n'), 'w');
    fs.write(fileURL+ '-' + title +'-descs.txt', resultObj.descs.join('\n'), 'w');


    // echo results in some pretty fashion
    this.echo(resultObj.links.length + ' links found:');
    this.echo(' - ' + resultObj.links.join('\n - ')).exit();
  });

}

casper.start('http://www.bigc.vn/san-pham.aspx?sni=' + sni + '&st=' + st, function() {
});

initSteps(targetFile);

casper.run(function() {
    // echo results in some pretty fashion
    this.echo('Done');
});