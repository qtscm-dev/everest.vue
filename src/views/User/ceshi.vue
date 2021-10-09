<template>
  <div>
    <a-select default-value="lucy" style="width: 120px" @change="handleChange">
      <a-select-option value="jack"> Jack </a-select-option>
      <a-select-option value="lucy"> Lucy </a-select-option>
      <a-select-option value="disabled" :disabled="dis">
        Disabled
      </a-select-option>
      <a-select-option value="Yiminghe"> yiminghe </a-select-option>
    </a-select>
    <a-select default-value="lucy" style="width: 120px" disabled>
      <a-select-option value="lucy"> Lucy </a-select-option>
    </a-select>
    <a-select default-value="lucy" style="width: 120px" loading>
      <a-select-option value="lucy"> Lucy </a-select-option>
    </a-select>
    han(id,recoped.is_leader)
  </div>
</template>
<script>
export default {
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>
