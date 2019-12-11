// let amount = $('#pay_amount').val();
let amount = 10;
let email = $('#pay_email').val();
let vendor_id = $('#pay_vendor_id').val();
let pay_url = $('#pay_url').val();

let business_id = $('#pay_business_id').val();
let deal_id = $('#pay_deal_id').val();
let event_id = $('#pay_event_id').val();
let category_id = $('#pay_category_id').val();
let balance_transaction = $('#pay_balance_transaction').val();
let pay_success_url = $('#pay_success_url').val();

const encdata = { 
  paypal_email: email, 
  amount: amount,
  vendor_id, 
  business_id,
  deal_id,
  event_id,
  category_id,
  balance_transaction
};
    let str = btoa(JSON.stringify(encdata));
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
}

const objData = {
  _token: $('meta[name="csrf-token"]').attr('content'),
  data: result + str
}

paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: amount
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        console.log(details);
        jQuery("body").find('.custom-loading').show();
        // Call your server to save the transaction
        return fetch(pay_url, {
          method: 'post',
          headers: {
            'content-type': 'application/json',
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          },
          body: JSON.stringify(objData)
        })
          .then(function(res) {
            jQuery("body").find('.custom-loading').hide();
            console.log('res ', res);
            window.open(pay_success_url, "_self");
          })
          .then(function(res2){ 
            console.log('res2 ', res2);
          })
          .catch(function(err){ 
            console.log('err ', err);
            jQuery("body").find('.custom-loading').hide();
          })
      });
    }
  }).render('#paypal-button-container');



// $.ajax({
//     headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//     url: "/checkout/payToVendor",
//     type: "post",
//     dataType: "JSON",
//     data: objData,
//     success: function(res) {
//         console.log('p res ', res);
//     }, error: function(err) {
//       console.log('p err ', err);
//     }
// });
