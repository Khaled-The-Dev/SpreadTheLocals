import {AuthManager} from './Auth.Manager.js'
import {Parser} from '/lib/Parser.js'
import {app} from './app.main.js'

export class DB {
   constructor() {
     this.parser = new Parser()
     this.contentDiv = document.getElementById('content')
   }
   
   // init
   init(supabase) {
     this.supabase = supabase
   }
   // fetch all
   async fetch() {
     const { data, error } = await this.supabase
       .from('Posts')
       .select('*')
       if (error) {
         throw new Error('an error occurred')
       }
       // looping through it
       data.forEach((item) => {
         this.post = document.createElement('div')
         this.post.className = 'post-container'
         this.post.innerHTML = this.parser.Parse(item)
         this.contentDiv.append(this.post)
       })
   }
   
   // fetch with id
  async fetchRow_With_ID(data_id) {
     const { data: requested_item, error} = await this.supabase
        .from('Posts')
        .select('*')
        .eq('id', data_id)
        
      return requested_item
   }
}