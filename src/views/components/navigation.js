const nav = document.querySelector(".nav");
nav.innerHTML = `  
      <div class="navbar-logo">
        <a class="navbar-brand" href="/">
          <i class="fas fa-cookie-bite"></i>
          <span class="has-text-link">쇼핑 데모</span>
        </a>
      </div>
      <div class="navbar">
        <ul class="navbar-items">
          <li><a href="../login/login.html">로그인</a></li>
          <li><a href="../register/register.html">회원가입</a></li>
          <li>
            <a href="/cart"> <i class="fas fa-cart-shopping"></i> 카트 </a>
          </li>
        </ul>
      </div>
  `;
