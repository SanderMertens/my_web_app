


Vue.component('car', {
    props: ['car'],
    methods: {
        stop() {
            corto.publish({
                id: "/data/" + this.car.id,
                value: {
                    stop: true
                }
            });
        }
    },

    template: `
    <div class="car">
        Id: {{car.id}}<br>
        Speed: {{car.value.speed}}<br>
        Lat: {{car.value.latitude}}<br>
        Long: {{car.value.longitude}}

        <div class="button" v-on:click="stop()">STOP</div>
    </div>`
});

var app = new Vue ({
  el: '#app',

  methods: {
    connect() {
      console.log("connecting to " + window.location.host);

      corto.connect ({
        host: window.location.host,

        on_connected: function(msg) {
          console.log("connected to corto server");
          this.subscribe();
        }.bind(this),

        on_close: function(msg) {
          console.log("disconnected from corto server");
          this.connected = false;
        }.bind(this),

        on_open: function() {
          console.log("connection opened to corto server");
          this.connected = true;
        }.bind(this),

        on_error: function() {
          console.log("corto server is not responding");
        }.bind(this)
      });
    },

    subscribe() {      
      corto.subscribe({id: "my_subscriber", db: this.data, 
        from: "data",

        on_error: function(error) {
          console.log("corto subscriber is not responding");
        }.bind(this)
      });
    }
  },

  data: {
    connected: false,
    tiles: [],
    threats: [],
    data: []
  }
});

window.onload = function() {
  console.log("Connect to server");
  app.connect()
}