<template>
<div class="ViewPokemon">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h2>{{item.name}}</h2>
      <p>{{item.type_one}}/{{item.type_two}}</p>
      <p>Weight: {{item.weight}} Height: {{item.height}}</p>
      <div class="imageAndStats">
        <img :src="item.path" />
        <p>HP: {{item.hp}}</p>
        <p>Special Attack: {{item.sp_attack}} Attack: {{item.attack}}</p>
        <p>Special Defense: {{item.sp_defense}} Special Defense: {{item.defense}}</p>
        </div>
        <div id="app">
          <button v-on:click="isHidden = !isHidden"> Show Moves </button>
  
          <h1 v-if="!isHidden">{{item.move1}} ---- {{item.move2}} </h1>
          <h1 v-if="!isHidden">{{item.move3}}  ---- {{item.move3}} </h1>
        </div>
      
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  
  name: 'ViewPokemon',
  data() {
    return {
     items: [],
     isHidden: false,
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 40%;
}
.imageAndStats {
  display: block;
}

.image img {
  width: 40%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 1;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 1;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 1;
  }
}
</style>