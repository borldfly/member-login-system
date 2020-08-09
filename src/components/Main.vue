<template>
  <div class="main">
    <Header></Header>
    <Aside></Aside>
    <Content></Content>
  </div>
</template>

<script>
  import Header from '@/components/main/Header'
  import Aside from '@/components/main/Aside'
  import Content from '@/components/main/Content'

  export default {
      name: 'Main',
      components: {
          Header,
          Aside,
          Content
      }
  }
</script>