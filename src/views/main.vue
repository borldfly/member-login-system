<template>
  <div class="main">
    <Header></Header>
    <Aside></Aside>
    <Content></Content>
  </div>
</template>

<script>
  import Header from '@/views/main/header'
  import Aside from '@/views/main/aside'
  import Content from '@/views/main/content'

  export default {
      name: 'Main',
      components: {
          Header,
          Aside,
          Content
      }
  }
</script>