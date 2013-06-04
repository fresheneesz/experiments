
Rescripted("Rescripted.Lang.CodePrinter",function(){
	return {
		Create:function(){
			var self = {
				currentIndent:0,
				buffer: [],
				push:function(code){
					self.print(code)
					self.currentIndent++;
				},
				indent:function(){
					var spaces = self.currentIndent * 2
					self.write("\n"+Array(spaces + 1).join(" "))		
				},
				print:function(code){
					self.indent();
					self.write(code);
				},
				write:function(code){ self.buffer.push(code) },
				pop:function(code){
					self.currentIndent--;
					self.print(code)
				},
				toString:function(){return self.buffer.join("")},
				getCode:function(){
					var code = self.toString();
					self.buffer = [];
					self.currentIndent = 0;
					return code;
				}
			}
			return self;
		}
	}
});
