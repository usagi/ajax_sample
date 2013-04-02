<?php
try
{
  $o = $_REQUEST['op'   ]; // 演算子
  $l = $_REQUEST['left' ]; // 左辺
  $r = $_REQUEST['right']; // 右辺
  
  if( is_null($o) )
    throw new Exception('op is null');
  if( is_null($l) )
    throw new Exception('left is null');
  if( is_null($r) )
    throw new Exception('right is null');

  if( ! is_numeric($l) )
    throw new Exception('left is not a number');
  if( ! is_numeric($r) )
    throw new Exception('right is not a number');

  if( $o === 'div' && $r == 0)
    throw new Exception('zero divede');

  switch($o)
  {
  case 'add': $r = $l + $r; break;
  case 'sub': $r = $l - $r; break;
  case 'mul': $r = $l * $r; break;
  case 'div': $r = $l / $r; break;
  default: throw new Exception('unknown op');
  }
  
  $v =
  [ 'error'  => false
  , 'result' => $r
  ];
  echo(json_encode($v));
}
catch(Exception $e)
{
  $v =
  [ 'error'  => true
  , 'result' => $e->getMessage()
  ];
  echo(json_encode($v));
}
