<template>
  <div class="flex flex-col items-center p-4 container mx-auto">
    <div class="flex flex-col md:flex-row mb-4">
      <div class="flex items-center">
        <font-awesome-icon
          icon="search"
          class="text-grey-500 absolute ml-6"
        ></font-awesome-icon>
        <input
          type="text"
          class="text-3xl rounded-full text-center p-2 m-2"
          v-model="search"
        />
      </div>
      <button
        class="text-xl rounded-full px-4 m-2 bg-purple-500 text-white"
        @click="sendSearch"
      >
        Search
      </button>
    </div>
    <div
      class="flex justify-center items-center w-2/3"
      v-if="videos.length > 0"
    >
      <button @click="decrementVid">
        <font-awesome-icon
          icon="caret-left"
          size="3x"
          class="m-2 text-purple-500"
        ></font-awesome-icon>
      </button>
      <youtube
        :video-id="selectedVideo.id"
        ref="youtube"
        :player-vars="playerVars"
        @ready="videoReady"
      ></youtube>
      <button @click="incrementVid">
        <font-awesome-icon
          icon="caret-right"
          size="3x"
          class="m-2 text-purple-500"
        ></font-awesome-icon>
      </button>
    </div>
    <p class="text-xl md:text-3xl text-center">
      YouTube Viewer, a quick way to search for videos without all the
      distractions
    </p>
  </div>
</template>

<script>
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.VUE_APP_KEY
});

export default {
  name: "App",
  data() {
    return {
      videos: [],
      selectedIndex: 0,
      search: "",
      loading: true,
      playerVars: {
        origin: this.windowLoc
      }
    };
  },
  methods: {
    async sendSearch() {
      const results = await youtube.search.list({
        part: "snippet,contentDetails,statistics",
        q: this.search
      });
      // this.videos = results.data.items;
      console.log(results);
    },
    videoReady() {
      this.loading = false;
      console.log("Video done");
    },
    decrementVid() {
      if (this.selectedIndex === 0) this.selectedIndex = this.videos.length - 1;
      else this.selectedIndex = this.selectedIndex - 1;
    },
    incrementVid() {
      if (this.selectedIndex === this.videos.length - 1) this.selectedIndex = 0;
      else this.selectedIndex = this.selectedIndex + 1;
    }
  },
  async mounted() {
    const temp = await youtube.videos.list({
      part: "snippet,contentDetails,statistics",
      id: "0LHxvxdRnYc,pU8-7BX9uxs,bILE5BEyhdo,jCyEX6u-Yhs,adzYW5DZoWs"
    });
    this.videos = temp.data.items;
    this.videoIndex = 0;
  },
  computed: {
    selectedVideo() {
      return this.videos[this.selectedIndex];
    },
    player() {
      return this.$refs.youtube.player;
    }
  }
};
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: hsl(0, 0%, 90%);
}
</style>
