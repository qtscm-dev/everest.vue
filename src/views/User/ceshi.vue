<template>
  <a-tree-select
    v-model="value"
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    placeholder="Please select"
    tree-default-expand-all
  >
    <!-- <span
      v-if="id === '0-0-1'"
      slot="title"
      slot-scope="{ id }"
      style="color: #08c"
    >
      Child Node1 {{ treeData.children.nm }}
    </span> -->
  </a-tree-select>
</template>

<script>
export default {
  data() {
    return {
      value: undefined,
      treeData: [],
    };
  },
  methods: {
    getIndex() {
      this.$api
        .get(this.baseURL + "assign/direct_assign/", {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        })
        .then((res) => {
          let result = res.data.data.data;
          this.treeData = result;
          // console.log(result);
          console.log(this.value);
          // console.log(this.treeData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getIndex();
  },
  watch: {
    value(value) {
      console.log(value);
    },
  },
};
</script>
