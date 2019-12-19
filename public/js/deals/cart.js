$(function(){

 function ErrorMsg(type,message){

      var txt  ='';
          txt +='<div class="alert alert-'+type+'" role="alert">';
          txt +=message;
          txt +='</div>';

          return txt;
  }


/*----------------------------------------------------------------------------
|
|   Business filter
|_____________________________________________________________________________
*/

function erorrMessage(errors) {

      var txt ="";
      $.each(errors, function( index, value ) {
        txt += ErrorMsg('warning',value);
          
      });
      return txt;
}

//######################################################################################################
//    start
//######################################################################################################



$("body").on('click','.cartModal',function(e){
     e.preventDefault();
     var $this = $( this );
     var package_id = $this.attr('data-id');
     var url = $this.attr('data-action');

     $.ajax({
               url : url,
               data : {
               package_id : package_id
               },
               type: 'GET',   
               dataTYPE:'JSON',
               headers: {
                 'X-CSRF-TOKEN': $('input[name=_token]').val()
               },
                beforeSend: function() {
                    $("body").find('.custom-loading').show();
                     $this.find('.messageNotofications').html('');
             

                },
                success: function (result) {
                      updateDataToCartModalPopupBeforeLogin($this);

                      $("body").find('#cartModal').modal('show');


                       if(parseInt(result.status) == 0){
                       
                          $this.find('.messageNotofications').html(ErrorMsg('warning',result.errors));
                           
                       }else if(parseInt(result.status) == 1){

                          updateDataToCartModalPopup(result);
                       }else if(parseInt(result.status) == 4){
                             $this.find('.messageNotofications').html(ErrorMsg('warning',result.message));
                             $("body").find('#LoginModel').modal({backdrop: 'static', keyboard: false});
                           
                       }
                      $("body").find('.custom-loading').hide();
               },
               complete: function() {
                        $("body").find('.custom-loading').hide();
               },
               error: function (jqXhr, textStatus, errorMessage) {
                     
               }

    });

});


function updateDataToCartModalPopupBeforeLogin($this) {
      var $modal = $("body").find('#cartModal');
    var package_id = $this.attr('data-id');
    var package_title = $this.attr('data-title');
    var package_description = $this.attr('data-description');
    var deal_id = $this.attr('data-dealId');

    $modal.find('#package_id').val(package_id);
    $modal.find('#deal_id').val(deal_id);
    $modal.find('.modal-package-title').text(package_title);
    $modal.find('.modal-package-description').html(package_description);
  
}


function updateDataToCartModalPopup(result) {
    var $modal = $("body").find('#cartModal');
    var package_id = result.package.id;
    var package_title = result.package.title;
    var package_description = result.package.description;

    $modal.find('#package_id').val(package_id);

    $modal.find('.modal-package-title').text(package_title);
    $modal.find('.modal-package-description').html(package_description);

   userCategoryOptions(result.upcoming_events);
}


function userCategoryOptions(upcoming_events) {
   var $modal = $("body").find('#cartModal');
    text ='<option value="">Events</option>';

    $.each( upcoming_events, function( key, value ) {
         text +='<option value="'+value.id+'">'+value.title+'</option>';
    });
 
    $modal.find('#cart-select').html(text);
}



function getAllcategoriesAssigedToEvent(result) {
     var $modal = $("body").find('#cartModal');

          txt ='';
     $.each( result.records, function( key, value ) {
       
          txt +='<div class="col-lg-6">';
          txt +='<div class="vendor-category">';
          txt +='<div class="category-checkboxes category-title">';
          txt +='<input type="checkbox" name="" value="1" id="ser-0" checked="" readonly="">';
          txt +='<label for="category-1">'+value.event_category.label+'</label>';
          txt +='</div>';
          txt +='</div>';
          txt +='</div>';
     });
 
     $modal.find('#eventAllCategories').html(txt);
}


//######################################################################################################
//    end
//######################################################################################################


$("body").on('change','#cart-select',function(){
          var $this = $( this );
           var $modal = $("body").find('#cartModal');
           var package_id = $modal.find('#package_id').val();
          $.ajax({
               url : $this.attr('data-action'),
               data : {
                event_id:$this.val(),
                package_id:package_id
               },
               type: 'GET',  // http method
               dataTYPE:'JSON',
               headers: {
                 'X-CSRF-TOKEN': $('input[name=_token]').val()
               },
                beforeSend: function() {
                    $this.find('.loading').show();
                    $this.find('button.cstm-btn').attr('disabled','true');
                     $("body").find('.custom-loading').show();
                },

               success: function (data) {


                      if(parseInt(data.status) == 1){
                           
                           getAllcategoriesAssigedToEvent(data);

                      }else{
                        $("body").find('.custom-loading').hide();
                        //$this.find('button.cstm-btn').removeAttr('disabled');
                         $modal.find('#eventAllCategories').html(data.errors);
                       setTimeout(function () {
                                $modal.find('#eventAllCategories').html('');
                         },15000);
                         
                      }
                    
               },
               complete: function() {
                        $this.find('.loading').hide();
                        // $("body").find('.custom-loading').hide();
                       // $this.find('button.cstm-btn').removeAttr('disabled');
               } 

        });


});





$("body").on('submit','#loginForm',function(e){
   e.preventDefault();
   login($(this));
});
loginValidation();
 

function login($this) {
   
   var $dealModal = jQuery("body").find('#myModalDealDiscount');

            $.ajax({
               url : $this.attr('action'),
               data : $this.serialize(),
               type: 'POST',  // http method
               dataTYPE:'JSON',
               headers: {
                 'X-CSRF-TOKEN': $('input[name=_token]').val()
               },
                beforeSend: function() {
                    $this.find('.loading').show();
                    $this.find('button.cstm-btn').attr('disabled','true');
                     $("body").find('.custom-loading').show();
                },

               success: function (data) {
                      if(parseInt(data.status) == 1){
                           $this[0].reset();
                           $("body").find('#LoginModel').modal('hide');

                           jQuery("body").find('#myModalDealDiscount')
                                          .find('.messageNotofications')
                                          .html(ErrorMsg('success','Login Successfully. Now you can sen message to vendor for deal & Discount.'));
                            
                              userCategoryOptions(data.upcoming_events);

                            $("body").find('.custom-loading').hide();

                      }else if(parseInt(data.status) == 2){

                       
                        $this.find('button.cstm-btn').removeAttr('disabled');
                        $this.find('.messageNotofications').html(ErrorMsg('success',data.message));
                         $("body").find('.custom-loading').hide();

                        setTimeout(function () {
                                 $this.find('.messageNotofications').html('');
                        },3000);
                         
                      }else{

                        
                         $("body").find('.custom-loading').hide();
                        $this.find('button.cstm-btn').removeAttr('disabled');
                        $this.find('.messageNotofications').html(erorrMessage(data.errors));

                        setTimeout(function () {
                                 $this.find('.messageNotofications').html('');
                        },3000);
                         
                      }
                    
               },
               complete: function() {
                        $this.find('.loading').hide();
                        // $("body").find('.custom-loading').hide();
                        $this.find('button.cstm-btn').removeAttr('disabled');
               },
               error: function (jqXhr, textStatus, errorMessage) {
                     alert('error');
               }

        });

           return false;
}




function loginValidation() {
      var $formModal = $("body").find('#LoginModel');


      $formModal.validate({

            onfocusout: function (valueToBeTested) {
              $(valueToBeTested).valid();
            },

            highlight: function(element) {
              $('element').removeClass("error");
            },

            rules: {
               'email': {
                  required: true,
                  customemail: true,
              }, 
              'password': {
                  required: true,
               },
              valueToBeTested: {
                  required: true,
              }

            }
      });

}











//------------------------------------------------------------------------------------
//    Add To Cart
//------------------------------------------------------------------------------------


$("body").on('click','#btn-addCartButton',function(e){
     e.preventDefault();

     var actionUrl = $( this ).attr('data-action');
     var $this = $("body").find('form#AddToCart');
     var package_id = $this.attr('data-id');
     

     $.ajax({
               url : actionUrl,
               data :$this.serialize(),
               type: 'POST',   
               dataTYPE:'JSON',
               headers: {
                 'X-CSRF-TOKEN': $('input[name=_token]').val()
               },
                beforeSend: function() {
                    $("body").find('.custom-loading').show();
                     $this.find('.messageNotofications').html('');
                     //$this.find('button.cstm-btn').attr('disabled','true');

                },
                success: function (result) {
                      if(parseInt(result.status) == 0){
                        //  $('#cartModal').modal('show');
                          $this.find('.messageNotofications').html(ErrorMsg('warning',result.errors));
                           //$this.find('button.cstm-btn').removeAttr('disabled');
                       }else if(parseInt(result.status) == 1){
                        $this.find('.messageNotofications').html(ErrorMsg('success',result.errors));
                             
                             window.location.href = result.url;

                       }else if(parseInt(result.status) == 4){

                             $this.find('.messageNotofications').html(ErrorMsg('warning',result.message));
                             $("body").find('#LoginModel').modal({backdrop: 'static', keyboard: false});
                             //$this.find('button.cstm-btn').removeAttr('disabled');
                       }
                      $("body").find('.custom-loading').hide();
               },
               complete: function() {
                        $("body").find('.custom-loading').hide();
               },
               error: function (jqXhr, textStatus, errorMessage) {
                     
               }

    });

});


















});