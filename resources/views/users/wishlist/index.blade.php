@extends('layouts.home')
@section('content')
<link rel="stylesheet" type="text/css" href="{{url('/frontend/css/cart.css')}}">

<section class="log-sign-banner aos-init aos-animate" data-aos="fade-up" data-aos-duration="3000" "="" style="background:url(http://49.249.236.30:6633/uploads/1574318396.png);">
    <div class="container">
            <div class="page-title text-center">
                     <h1>Wishlist</h1>
                </div>
            </div>    
        </section>


<section class="cart-sec wishlist-sec">
   <div class="container lr-container">
     <div class="sec-card">
        <div class="cart-card">
           <div class="card-heading">
                <h3>My Wishlist</h3>
            </div>

                       <div class="responsive-table">
                <table class="table cart-table">
                    <thead>
                        <tr>
                            <th width="20%">Event</th>
                            <th width="20%">Packages</th>
                            <th width="20%">Deals & Discount</th>
                            <th>Basic Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="">
                        <tr><td>Lorem ipsum</td>
                            <td>Lorem ipsum</td>
                            <td>20%</td>
                            <td>
                                <a href="javascript:void(0);" class="table-cart-btn">Add to cart</a> </td>
                                <td></td>
                            </tr>
                    </tbody>
                </table>
        </div>
        
        </div>
    </div>
  </div>
</section>








 


@endsection