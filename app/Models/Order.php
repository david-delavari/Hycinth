<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    


     public function orderItems()
    {
    	return $this->hasMany('App\Models\EventOrder');
    }


      public function user()
    {
    	return $this->belongsTo('App\User');
    }

}
