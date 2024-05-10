<script>
</script>

<template>
  <div style="margin-top: 13%;">
    <div class="footers mt-5 m-auto justify-content-around d-flex position-relative">
      <div class=" m-auto p-4 mx-5">

        <div class="text-white">
          <h5>ITC Campus</h5>
          <hr class="w-25 ">
          <p class="text-box">Office of the Registrar, Institute of Technology of Cambodia, Russian Confederation
            Boulevard, P.O. Box 86,
            Phnom Penh, Cambodia</p>
        </div>

        <div class="text-box text-white d-flex  ">
          <!-- routerlink -->
          <p>Contact &emsp;|&emsp;</p>
          <i class='bx bxl-facebook-circle mt-1'>&emsp;</i>
          <!-- routerlink -->
          <p>info@itc.edu.kh &emsp;|&emsp;</p>
          <!-- routerlink -->
          <p>023 880 370</p>
        </div>

      </div>

      <div class=" m-auto p-4 ">

        <div class="text-white">
          <h5>Graduate School</h5>
          <hr class="w-25 ">
          <p class="text-box">Graduate School, A public higher education institution offering master & doctoral degrees in
            field of
            engineering, located in ITC Campus</p>
        </div>

        <div class="text-white d-flex text-box m-auto">
          <!-- routerlink -->
          <p>Contact &emsp;|&emsp;</p>
          <i class='bx bxl-facebook-circle mt-1'>&emsp;</i>
          <!-- routerlink -->
          <p>info@itc.edu.kh &emsp;|&emsp;</p>
          <!-- routerlink -->
          <p>023 880 370</p>
        </div>

      </div>


    </div>
  </div>
</template>
<style lang="scss">
@import url('boxicons');

.footers {
  width: 100%;
  height: 240px;
  background-color: #243673;

  @media (min-width: 1236px) {
    margin: auto;
  }
}

.text-box {
  width: 90%;
  height: 75px;
  // overflow: hidden;
  word-wrap: break-word;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }

  @media screen and (max-width: 480px) {
    font-size: 12px;
  }
}
</style>