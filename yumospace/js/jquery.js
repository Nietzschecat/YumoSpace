/* thank-etc-ok.com */

(function($) {
  $.fn.extend({
    digital: function(text) {
      var self = $(this);
      var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      var original = text;

      for (var i = 0; i < text.length; i++) {
        var rChar = chars[Math.floor(Math.random() * chars.length)];
        if (text[i] !== ' ') text = setCharAt(text, i, rChar);
      }
      
      function writeText() {
        self.empty();
        
        var space = false;
        var postSpace = false;
        var classes = 'c';
        for (var i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            postSpace = true;
            space = true;
          }
          
          if (postSpace) {
            classes = 'c white';
          }
          
          if (space) {
            classes = 'c s';
            space = false;
          }
          
          self.append('<span class="' + classes + ' c' + i + '">' + text[i] + '</span>');
        }
      }
      
      var changeIteration = 0;
      
      function changeChar() {
        if (changeIteration % 4 === 0 && changeIteration > 20) {
          var same = true;
          
          while (same) {
            var index = Math.floor(Math.random() * text.length);
            if (text[index] !== original[index]) same = false;
          }
          
          text = setCharAt(text, index, original[index]);
        } else {
          for (var i = 0; i < text.length; i++) {
            if (text[i] !== original[i]) {
              var same = true;
          
              while (same) {
                var rChar = chars[Math.floor(Math.random() * chars.length)];
                var index = Math.floor(Math.random() * text.length);
                if (text[index] !== chars[index]) same = false;
              }

              text = setCharAt(text, i, rChar);
            }
          }
        }
        
        writeText();
        
        if (text === original) {
          return false;
        } else {
          setTimeout(function() {
            changeChar();
          }, 1000 / 16);
          changeIteration++;
        }
      }
      
      function setCharAt(str, index, chr) {
        if (index > str.length - 1) return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
      }
  
      changeChar();
    }
  });
})(jQuery);