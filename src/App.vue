<template>
  <div
    class="flex flex-col md:flex-row justify-around p-4 md:h-screen items-center"
  >
    <div class="flex flex-col justify-center mx-8 animateAll">
      <div class="flex items-center">
        <font-awesome-icon
          icon="search"
          class="text-grey-500 absolute ml-6"
        ></font-awesome-icon>
        <input
          type="text"
          class="text-3xl w-full rounded-full shadow-lg text-center p-2 m-2"
          v-model="search"
          @enter="sendSearch"
        />
      </div>
      <button
        class="text-xl rounded-full px-4 m-2 bg-purple-700 text-white shadow-lg"
        @click="sendSearch"
      >
        Search
      </button>
      <div v-if="videos.length > 0" class="mt-8">
        <div
          class="rounded shadow-lg overflow-auto p-2 my-2"
          :class="
            selectedVideo && selectedVideo.id === vid.id
              ? 'bg-purple-700 text-white'
              : 'bg-white'
          "
          v-for="vid in videos"
          :key="vid.id"
          @click="selectedVideo = vid"
        >
          {{ vid.snippet.title }}
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2" v-if="selectedVideo">
      <div class="relative" style="padding-top:56.25%">
        <iframe
          :src="youtubeLink"
          class="absolute inset-y-0 w-full h-full"
          frameborder="0"
        />
      </div>
      <div
        class="flex flex-col items-center text-xl shadow-lg my-4 p-4 bg-white rounded"
      >
        <p class="border-b border-gray-500 w-full text-center p-2">
          {{ selectedVideo.snippet.title }}
        </p>
        <div class="border-b border-gray-500 w-full text-center p-2">
          <font-awesome-icon
            icon="caret-down"
            size="2x"
            @click="fullDesc = !fullDesc"
            :transform="{ rotate: fullDesc ? 180 : 0 }"
          ></font-awesome-icon>
          <p :class="fullDesc ? 'break-words' : 'truncate'">
            {{ selectedVideo.snippet.description }}
          </p>
        </div>

        <p>{{ selectedVideo.statistics.viewCount }} Views</p>
        <p>{{ selectedVideo.statistics.likeCount }} Likes</p>
        <p>{{ selectedVideo.statistics.dislikeCount }} Dislikes</p>
      </div>
    </div>
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
      selectedVideo: null,
      search: "",
      fullDesc: false,
      loading: true
    };
  },
  methods: {
    async sendSearch() {
      this.selectedVideo = null;
      const results = await youtube.search.list({
        part: "snippet",
        type: "video",
        fields: "items/id/videoId",
        q: this.search
      });
      this.getVideoData(
        results.data.items.map(item => item.id.videoId).join(",")
      );
    },
    async getVideoData(ids) {
      const temp = await youtube.videos.list({
        part: "snippet,statistics",
        // fields:
        //   "snippet/thumbnails/default,snippet/title,snippet/description,statistics/viewCount,statistics/likeCount,statistics/dislikeCount",
        id: ids
      });
      this.videos = temp.data.items;
    }
  },
  async mounted() {
    this.getVideoData(
      "0LHxvxdRnYc,pU8-7BX9uxs,bILE5BEyhdo,jCyEX6u-Yhs,adzYW5DZoWs"
    );
  },
  computed: {
    youtubeLink() {
      return `https://youtube.com/embed/${this.selectedVideo.id}`;
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

.animateAll {
  transition: all 0.5s;
}
</style>
