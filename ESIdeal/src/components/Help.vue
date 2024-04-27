<template>
    <div class="image-container" @mouseover="showHoverImage = true" @mouseleave="showHoverImage = false">
      <img
        src="/images/QuestionMark.png"
        class="default-image"
      />
      <img
        v-if="showHoverImage"
        :src="hoverIMG" 
        class="hover-image"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      hoverIMG: {
        type: String,
        required: true 
      }
    },
    data() {
      return {
        showHoverImage: false
      };
    }
  };
  </script>
  
<style scoped>
  .image-container {
    position: relative;
    display: flex; 
    align-items: center;
  }
  
  .default-image {
    display: block;
    width: 35px;
    height: auto;
  }
  
  .hover-image {
    position: absolute;
    left: 110%;
    top: -10px;
    width: 250px;
    height: auto;
    transition: opacity 0.3s ease-in-out;
    opacity: 0; /* esconder img */
    z-index: 100;
  }
  
  .image-container:hover .hover-image {
    opacity: 1;
  }

  @media (max-width: 700px) {
    .default-image {
      width: 2.2em;
    }
  }

</style>
  
  