var fs = require("fs");
var path = require("path");

exports.check = function (marko, markoCompiler, expect, snapshot, done) {
  var compiler = require("marko/compiler");
  var templatePath = path.join(__dirname, "template.marko");

  var templateSrc = fs.readFileSync(templatePath, { encoding: "utf8" });

  compiler.compileForBrowser(
    templateSrc,
    templatePath,
    {
      writeVersionComment: false,
    },
    function (err, compiledTemplate) {
      if (err) {
        return done(err);
      }

      try {
        var code = compiledTemplate.code;
        code = code.replace(/marko\/dist\//g, "marko/src/");
        snapshot(code, ".js");
        done();
      } catch (err) {
        done(err);
      }
    }
  );
};
