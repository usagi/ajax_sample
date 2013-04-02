$(function(){

  // calcオブジェクトのコンストラクターをでっちあげます
  // コンストラクターにはインスタンスごとに
  // 個別に値を持つプロパティをthis.hoge='初期値'とか
  // 生成させるようにしておきます。だってコンストラクターだもの。
  //   参考: http://v20.www.wonderrabbitproject.net/Lectures/JavaScript/0008/#new演算子とdelete演算子
  var calc_c = function()
  {
    this.stack = [];
    this.buffer = '0';
  };
  // calcオブジェクトのプロトタイプをでっちあげます
  // プロトタイプにはインスタンスによらずに
  // 共有される原型オブジェクトを放り込んでおきます
  //   参考: http://v20.www.wonderrabbitproject.net/Lectures/JavaScript/0008/#プロトタイプ
  calc_c.prototype.button = function(a)
  {
    switch(a)
    {
    case 'ac':
      this.stack = [];
      this.buffer = '0';
      $('#calc_display').css('color', 'black');
      break;
    case '0':
      if(this.buffer === '0')
        break;
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if(this.buffer === '0')
        this.buffer = a;
      else
        this.buffer += a;
      break;
    case 'dot':
      this.buffer += '.';
      break;
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
      this.stack.push(this.buffer);
      this.buffer = '';
      this.stack.push(a);
      break;
    case 'eq':
      if(this.stack.length === 2)
      {
        var data = {};
        data['op'   ] = this.stack.pop();
        data['left' ] = this.stack.pop();
        data['right'] = this.buffer;
        
        console.log(data);
        
        // ECMAScript<5ではクロージャーにbindを使えないので
        // こんな事をしてthis対策をする必要がある。
        // underscore.jsとかライブラリーを使っても解決可能。
        var this_ = this;
        
        $.get
        ( 'calc.php'
        , data
        , function(res_json)
          {
            var res = JSON.parse(res_json);
            var d = $('#calc_display');
            if(res['error'])
            {
              console.log(res['result']);
              d.text('ERROR');
              d.css('color', 'red');
            }
            else
            {
              d.text(res['result'].toString().substr(0,13));
              d.css('color', 'black');
              // this_ 経由でアクセスしないと、
              // このなかでの this はこのすぐ外側でのthisとは異なる
              this_.buffer = res['result'].toString();
            }
          }
        );
      }
      break;
    }
    
    console.log(a, this.stack, this.buffer);
    
    var v;
    if(this.stack.length === 2)
    {
      v = this.stack[0] + ' ';
      switch(this.stack[1])
      {
      case 'add': v += '＋'; break;
      case 'sub': v += 'ー'; break;
      case 'mul': v += '×'; break;
      case 'div': v += '÷'; break;
      };
      if(this.buffer !== '')
        v += ' ' + this.buffer;
    }
    else
      v = this.buffer;
    
    $('#calc_display').text(v.substr(0,13));
  };

  // もし、ブラウザーのコンソールからデバッグしたいなら
  // 一時的にvarを消してローカル変数→グローバル変数にすれば
  // 簡単かもね。
  var calc = new calc_c();
  
  $('#calc_ac').click(function(){ calc.button('ac'); });
  $('#calc_0').click(function(){ calc.button('0'); });
  $('#calc_1').click(function(){ calc.button('1'); });
  $('#calc_2').click(function(){ calc.button('2'); });
  $('#calc_3').click(function(){ calc.button('3'); });
  $('#calc_4').click(function(){ calc.button('4'); });
  $('#calc_5').click(function(){ calc.button('5'); });
  $('#calc_6').click(function(){ calc.button('6'); });
  $('#calc_7').click(function(){ calc.button('7'); });
  $('#calc_8').click(function(){ calc.button('8'); });
  $('#calc_9').click(function(){ calc.button('9'); });
  $('#calc_dot').click(function(){ calc.button('dot'); });
  $('#calc_add').click(function(){ calc.button('add'); });
  $('#calc_sub').click(function(){ calc.button('sub'); });
  $('#calc_mul').click(function(){ calc.button('mul'); });
  $('#calc_div').click(function(){ calc.button('div'); });
  $('#calc_eq').click(function(){ calc.button('eq'); });

});
