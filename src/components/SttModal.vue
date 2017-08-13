<template>
    <div class="modal" id="stt-modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
            <h4 class="modal-title">Create</h4>
          </div>
          <div class="modal-body">
            <p>「ja-JP_BroadbandModel」をベースにカスタムモデルを作成します。</p>
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label" for="createNameId">name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="createNameId" placeholder="名前" value="">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label" for="createDescriptionId">description</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="createDescriptionId" placeholder="説明" value="">
                </div>
              </div>
            </form>
            <p class="text-right">よろしいですか？</p>
          </div>
          <div class="modal-footer">
            <button id="cancelBtnId" type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button id="createBtnId" type="button" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
