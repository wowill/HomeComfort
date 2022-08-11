<template>
  <Carousel autoplay>
    <img
      class="login-banner"
      v-for="banner in bannerList"
      :key="banner.bannerId"
      :src="banner.fileModel.filePath"
      @click="handleBannerClick(banner)"
    />
  </Carousel>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Carousel } from 'ant-design-vue';
  import { getBannerListForLogin, addBannerClick } from '/@/api/sysConfig/banner';
  const bannerList = ref<BannerItem[]>([]);
  getBannerListForLogin().then((res) => {
    bannerList.value = res;
  });
  const handleBannerClick = (banner: BannerItem) => {
    if (banner.hrefType === 1) {
      window.open(banner.href, '_blank');
    }
    addBannerClick(banner.bannerId);
  };
</script>
<style scoped lang="less">
  .login-banner {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  .ant-carousel {
    :deep(.slick-track) {
      display: flex;
      flex-wrap: nowrap;
      align-items: flex-end;
    }
    // :deep(.slick-list) {
    //   background: #364d79;
    // }
  }
</style>
