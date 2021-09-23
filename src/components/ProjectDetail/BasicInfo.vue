<template>
  <div class="concenter">
    <div class="title">
      <span>基础信息</span>
    </div>
    <a-descriptions class="content" :column="4">
      <a-descriptions-item label="项目编号">{{
        ProjectBasicInfo.code
      }}</a-descriptions-item>
      <a-descriptions-item label="项目名称">{{
        ProjectBasicInfo.nm
      }}</a-descriptions-item>
      <a-descriptions-item label="合同编号">{{
        ProjectBasicInfo.contract_no
      }}</a-descriptions-item>
      <a-descriptions-item label="项目状态">
        <a-badge :status="badges" />{{ msg }}</a-descriptions-item
      >
      <a-descriptions-item label="流程编号">{{
        ProjectBasicInfo.proc_code
      }}</a-descriptions-item>
      <a-descriptions-item label="项目类型">{{
        ProjectBasicInfo.project_lbl
      }}</a-descriptions-item>
      <a-descriptions-item label="建设单位">{{
        ProjectBasicInfo.client_nm
      }}</a-descriptions-item>
      <a-descriptions-item label="建筑面积"
        >{{ ProjectBasicInfo.build_area }}平方米
      </a-descriptions-item>
      <a-descriptions-item label="幕墙面积"
        >{{ ProjectBasicInfo.wall_area }}平方米</a-descriptions-item
      >
      <a-descriptions-item label="门窗面积"
        >{{ ProjectBasicInfo.dw_area }}平方米</a-descriptions-item
      >
      <a-descriptions-item label="建筑高度"
        >{{ ProjectBasicInfo.build_height }}米</a-descriptions-item
      >
      <a-descriptions-item label="幕墙高度"
        >{{ ProjectBasicInfo.wall_height }}米</a-descriptions-item
      >
      <a-descriptions-item label="项目周期">{{
        ProjectBasicInfo.pro_cycle
      }}</a-descriptions-item>
      <a-descriptions-item label="建筑类型">{{
        ProjectBasicInfo.build_lbl
      }}</a-descriptions-item>
      <a-descriptions-item label="设计类型">{{
        ProjectBasicInfo.major_lbl
      }}</a-descriptions-item>
      <a-descriptions-item label="主设专业">
        {{ ProjectBasicInfo.main_major_lbl }}
      </a-descriptions-item>
      <a-descriptions-item label="建设地点">
        {{ ProjectBasicInfo.bulid_addr }}
      </a-descriptions-item>
      <a-descriptions-item label="竞争单位">
        {{ ProjectBasicInfo.competitor }}
      </a-descriptions-item>
      <a-descriptions-item label="设计报价">
        {{ ProjectBasicInfo.fee }}
      </a-descriptions-item>
      <a-descriptions-item label="代建">
        {{ ProjectBasicInfo.construction }}
      </a-descriptions-item>
      <a-descriptions-item label="母公司">
        {{ ProjectBasicInfo.parent_company }}
      </a-descriptions-item>
      <br />
      <br />
      <br />
      <a-descriptions-item label="备注">
        {{ ProjectBasicInfo.cmt }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
export default {
  name: "ProjectBasicInfo",
  props: {
    ProjectBasicInfo: {},
    badges: {},
    msg: {},
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.concenter {
  width: 100%;
  height: auto;
}
.concenter .title {
  line-height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 16px;
  color: #000;
}
.concenter .content {
  box-sizing: border-box;
  padding: 24px;
}
</style>
