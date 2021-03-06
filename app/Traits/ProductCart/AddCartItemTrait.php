<?php
namespace App\Traits\ProductCart;
use Illuminate\Http\Request;
 
use App\Models\Products\Product;
use Auth;
use App\Models\Vendors\Eshop;
use App\Models\Products\ProductCategory;
use App\Models\Shop\ShopCategory;
use App\Models\Products\ProductInventory;
use App\Models\Products\ProductImage;
use App\Models\Products\ProductAssignedVariation;
use App\Models\Shop\ShopCartItems;
use Cart; 
use App\Traits\ProductCart\Wishlist;
trait AddCartItemTrait{

use Wishlist;


#===============================================================================================


	public function addToCart(Request $request,$product_id)
	{

		
       $product = Product::with([
          'ProductAssignedVariations',
          'ProductAssignedVariations.hasVariationAttributes'
       ])->where('id',$product_id)->first();

       $status = $this->checkAvailbility($request,$product);

       return response()->json($status);
	}




#===============================================================================================


public function checkAvailbility($request,$product)
{
    $product_type = $product->product_type;

	switch ($product_type) {
		case  1:
			 return $this->checkVariationOfProduct($request,$product);
			break;

	    case  0:
			 return $this->addCartItem($request,$product);
			break;
		
		default:
			# code...
			break;
	}
	 
}

#=================================================================================================================


public function checkVariationOfProduct($request,$product)
{

       $variant_id = $this->variationTypeAssignedToProduct($request,$product);
        

	 switch ($variant_id) {
	 	case 0:

	 		return ['status' => 0,'messages' => 'This Variation is not available'];
            break;

	 	case $variant_id > 0:

	 	     return $this->checkHasStock($request,$product,$variant_id);
             break;
	 	
	 	default:
	 		return ['status' => 0,'messages' => 'Something Wrong'];
	 		break;
	 }
}

#================================================================================================================

public function checkHasStock($request,$product,$variant_id)
{


    return $this->addCartItem($request,$product,$variant_id);
}

#================================================================================================================

public function addCartItem($request,$product,$variant_id=0)
{
	 if(Auth::check() && Auth::user()->role == "user"){
              $status = $this->SaveToShopUserCartItemTable($request,$product,$variant_id);
              return ['status' => $status,
              'url' => url(route('shop.cart')),
              'messages' => 'Product is added to cart successfully!'];
	 }else{
           $status = $this->SaveToSessionCart($request,$product,$variant_id);
           return ['status' => $status,
            'url' => url(route('shop.cart')),
           'messages' => 'Product is added to cart successfully!'];
	 }
    return ['status' => 0,'messages' => 'Something Wrong!'];
}


#================================================================================================================

public function SaveToShopUserCartItemTable($request,$product,$variant_id)
{ 
         $ShopCartItems = ShopCartItems::where('user_id',Auth::user()->id)
                                       ->where('product_id',$product->id)
                                       ->where('variant_id',$variant_id);
 
	     $variant = ProductAssignedVariation::find($variant_id);
         $product_id = $product->id;
         $price = $variant_id > 0 ? $variant->final_price : $product->final_price;
         $quantity = $ShopCartItems->count() > 0 ? ($ShopCartItems->first()->quantity + 1) : 1;
 
		 $s= $ShopCartItems->count() > 0 ? $ShopCartItems->first() : new ShopCartItems;
		 $s->product_id = $product_id;
		 $s->variant_id = $variant_id;
		 $s->vendor_id = $product->user_id;
		 $s->shop_id = $product->shop_id;
		 $s->price = $price;
		 $s->quantity = $quantity;
		 $s->total = ($quantity * $price);
		 $s->type="cart";
		 $s->user_id = Auth::user()->id;
		 $s->save();
		 return 1;

}

#================================================================================================================

public function SaveToSessionCart($request,$product,$variant_id)
{
	if($variant_id > 0){

		$variant = ProductAssignedVariation::find($variant_id);

		 $item = [
             'id' => $variant->id,
             'name' => $product->name,
             'price' => $variant->final_price,
             'quantity' => 1,
             'attributes' => [
                'options' => json_encode($request),
                'variant_id' => $variant->id,
                'product_id' => $product->id
             ]
		 ];
          
	}else{
		 $item = [
             'id' => $product->id,
             'name' => $product->name,
             'price' => $product->final_price,
             'quantity' => 1,
             'attributes' => [
                'options' => json_encode($request),
                'variant_id' => 0,
                'product_id' => $product->id
             ]
		 ];
	}

    Cart::add($item);
    return 1;
}


#=================================================================================================================
public function variationTypeAssignedToProduct($request,$product)
{ 
	    $types = $product->ProductAttributeVariableProduct->where('product_variant',1)->pluck('type')->toArray();
	    $parent = $product->ProductAssignedVariations;
        $var=[];
	    foreach ($request->all() as $key => $value) {
	    	  $var[$key] = $value;
	    }
          $variant_id = 0;
	      foreach($parent as $key => $value) {
	      	     $array = $value->hasVariationAttributes->pluck('attribute_id','type')->toArray();
	      	     if($array == $var){
	      	     	 $variant_id = $value->id;
	      	     }
	      	     
	      }

	      return $variant_id > 0 ? $variant_id : 0;
}

#=================================================================================================================















}