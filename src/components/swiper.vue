<template>
    <div class="swiper">
       <swiper indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500">
            <block v-for="(url,index) in imgUrls" :key="index">
             <swiper-item>
              <image :src="url" :class="slide-image" width="355" height="150"/>
             </swiper-item>
            </block>
       </swiper>
    </div>
</template>

<script>
export default {
  data:{
   imgUrls: [
      'https://www.google.com.np/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjm8vGxhu_dAhXEOI8KHYFBDxcQjRx6BAgBEAU&url=https%3A%2F%2Fphoenixhealthfund.com.au%2Fnew-brand%2F&psig=AOvVaw003n1XjdMqS9vsHWBZeJ89&ust=1538820085295498',
      'https://www.google.com.np/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjHmNu7he_dAhUbT48KHSr_AvcQjRx6BAgBEAU&url=https%3A%2F%2Fwww.livelaw.in%2Festablishment-of-medical-colleges-mci-and-central-govt-must-show-due-diligence-right-from-the-day-when-the-applications-are-received-sc%2F&psig=AOvVaw2QszDk6Fy3j9GHvcfKqH5y&ust=1538819882611121',
      'https://www.google.com.np/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiX5fudhe_dAhVGLY8KHajICdYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.assetprotectionlawjournal.com%2F2009%2F08%2Fasset-protection-strategies-for-a-private-medical-practice%2F&psig=AOvVaw2QszDk6Fy3j9GHvcfKqH5y&ust=1538819882611121'
],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  }
}
</script>

<style>
 .swiper{
    width: 100%;
    height: 417rpx;
    margin-top: 80rpx;
 }
</style>