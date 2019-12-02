<header class="site-header">
        <!-- header starts here -->
        <div class="top-bar inner-header">
            <div class="container">
              <div class="top-inner-nav mob-hide"> 
                <a href="{{url('/')}}" class="brand-name"><img src="/frontend/images/logo.svg"></a>
                <button class="menu-toggle" type="button">
                    <span><i class="fas fa-bars"></i></span> Menu
                </button>
                
                <ul class="inn-top-navigation">
                    <li><a href="{{url('/')}}">Home</a></li>
                   <li><a href="javascript:void(0);" data-toggle="modal" data-target="#VenuesCategoriesModal">Businesses</a></li>
             <li><a href="{{url(route('all_deals'))}}">Deals & Discount</a></li>
                    <li><a href="{{url('/vendor/register')}}">New Vendors</a></li>
                    <li>
                        <a href="javascript:void(0);"><i class="fas fa-heart"></i></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);"><i class="fas fa-envelope"></i></a>
                    </li>
                          @if(Auth::check())
                       
                   <li>                                       
                        <div class="nav-item nav-profile dropdown">
                          <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                            <span class="nav-profile-img">
                              <i class="fas fa-user-circle"></i>
                            </span>
                            <div class="nav-profile-text">
                              <p class="user-name-text">{{Auth::user()->name}}</p>
                            </div>
                          </a>
                          <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 36px, 0px); top: 0px; left: 0px; will-change: transform;">
                            <a class="dropdown-item" href="{{url(route(Auth::user()->role.'_dashboard'))}}"><span><i class="far fa-user"></i></span> Profile</a>
                               <a class="dropdown-item" href="/logout"><span><i class="fas fa-sign-out-alt"></i></span> Logout</a>
                           </div>
                        </div>
                  </li>
                          @else
                    <li class="user header-btns">
                            <a href="{{url('/login')}}" class="cstm-btn solid-btn">Login</a>
                            <a href="{{url('/register')}}" class="cstm-btn">Sign Up</a>
                    </li>
                          @endif
                        
                        
                  
                </ul>
                <button class="toolbox" type="button">
                    <span><i class="fas fa-wrench"></i></span> Toolbox
                </button>
              </div>
             <div class="top-Mob-nav">
                 <div class="top-menus-wrap">
                <button class="menu-toggle" type="button">
                    <span><i class="fas fa-bars"></i></span> Menu
                </button>
                <a class="brand-name"><img src="/frontend/images/logo.svg"></a>
                <button class="toolbox mob-hide" type="button">
                    <span><i class="fas fa-wrench"></i></span> Toolbox
                </button>
                <!-- only for mobile -->
                <ul class="mob-side-menus">
                    <li class="user">
                       
                   @if(Auth::check())

                    <span>
                            <i class="fas fa-user"></i>
                        </span>
                  <div class="dropdown">
                     <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{Auth::user()->name}}</a>
                     <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="/{{Auth::user()->role}}">Profile</a>
                        <a class="dropdown-item" href="/logout">Logout</a>
                     </div>
                  </div>
                  @else
                  <a href="{{url('/login')}}" class="cstm-btn solid-btn">Login</a>
                  <a href="{{url('/register')}}" class="cstm-btn">Sign Up</a>
                  @endif
                    </li>
                <li>
                <button class="toolbox" type="button">
                    <span><i class="fas fa-wrench"></i></span> Toolbox
                </button>
              </li>
              <li>
                  <div class="icon-grp">
                     <a href="javascript:void(0);" class=""><i class="fas fa-envelope"></i></a>
                      <a href="javascript:void(0);" class="fav-list">
                            <i class="fas fa-heart"></i>
                            <sup>2</sup>
                        </a>
                  </div>
              </li>

            </ul>
           </div>
            </div>
        </div>
        </div>

   

        <a href="javascript:void(0);" id="calender-toggle">
          <span><i class="fas fa-calendar-alt"></i></span>
        </a>
       
    </header>