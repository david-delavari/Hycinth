<?php

namespace App\Models\Products;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
class Variation extends Model
{
        

    use Sluggable;
    use SluggableScopeHelpers;

    
    public function sluggable()
    {
        return [

            'type' => [
                'source' => 'name'
            ]
        ];
    }

}
