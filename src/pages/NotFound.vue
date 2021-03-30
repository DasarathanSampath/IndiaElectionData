  
<template>
    <div class="centered">
      <h1 class="headingLarge">Not Found</h1>
      <p class="textLarge">
        Ooops, we couldn't find what you are looking for OR we have modified our pages. Why don't you
        <router-link :to="{name: 'Home'}">
            go home instead?
        </router-link>
      </p>
    </div>
</template>

<script>

</script>

<style scoped>
  .headingLarge {
    font-size: 50px;
  }
  .textLarge {
    font-size: 25px;
    font-weight: 100;
  }
  .centered {
    text-align: center;
  }
</style>