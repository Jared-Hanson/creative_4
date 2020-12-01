<template>
<div class="CreatePokemon">

      <h1>Create Your Pokemon Here!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add Basic Stats and Image</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Name">
        <p></p>
        <input v-model="type_one" placeholder="Type 1">
        <input v-model="type_two" placeholder="Type 2">
        <p></p>
        <input v-model="height" placeholder="Height">
        <input v-model="weight" placeholder="Weight">
        <p></p>
        <input v-model="hp" placeholder="Hp">
        <p></p>
        <input v-model="attack" placeholder="Attack">
        <input v-model="sp_attack" placeholder="Sp. Attack">
        
        <p></p>
        <input v-model="defense" placeholder="Defense">
        <input v-model="sp_defense" placeholder="Sp. Defense">
        
        
        <h3>Add an image for your Pokemon!</h3>
        <input type="file" name="photo" @change="fileChanged">
        
        
        
      
<div class="heading">
      <div class="circle">2</div>
      <h2>Create a Moveset</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="move1" placeholder="Move 1">
        <p></p>
        <input v-model="move2" placeholder="Move 2">
        <p></p>
        <input v-model="move3" placeholder="Move 3">
        <p></p>
        <input v-model="move4" placeholder="Move 4">
        <p></p>
      </div>
    </div>
    <button @click="upload">Create Pokemon</button>
</div>
      <div class="upload" v-if="addItem">
        <h2>{{addItem.name}}</h2>
        <h2>{{addItem.type_one}}</h2>
        <h2>{{addItem.type_two}}</h2>
        <h2>{{addItem.height}}</h2>
        <h2>{{addItem.weight}}</h2>
        <h2>{{addItem.hp}}</h2>
        <h2>{{addItem.attack}}</h2>
        <h2>{{addItem.sp_attack}}</h2>
        <h2>{{addItem.defense}}</h2>
        <h2>{{addItem.sp_defense}}</h2>
        
        <h2>{{addItem.move1}}</h2>
        <h2>{{addItem.move2}}</h2>
        <h2>{{addItem.move3}}</h2>
        <h2>{{addItem.move4}}</h2>
        <img :src="addItem.path" />
      </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'CreatePokemon',
    data() {
    return {
      name: "",
      type_one: "",
      type_two: "",
      height: "",
      weight: "",
      hp: "",
      attack: "",
      sp_attack: "",
      defense: "",
      sp_defense: "", 

      move1: "",
      move2: "", 
      move3: "",
      move4: "",

      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    
  },
   created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name, this.file.type_one, this.file.type_two, this.file.height, this.file.weight, this.file.hp, this.file.attack, this.file.sp_attack, this.file.defense, this.file.sp_defense, this.file.move1, this.file.move2, this.file.move3, this.file.move4)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/items', {
          name: this.name,
          type_one: this.type_one,
          type_two: this.type_two,
          height: this.height,
          weight: this.weight,
          hp: this.hp,
          attack: this.attack,
          sp_attack: this.sp_attack,
          defense: this.defense,
          sp_defense: this.sp_defense,
          move1: this.move1,
          move2: this.move2,
          move3: this.move3,
          move4: this.move4,
    
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
  try {
    let response = await axios.get("/api/items");
    this.items = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          discription: this.findItem.discription,
        });
        this.findItem = null;
        this.getItems();
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
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>