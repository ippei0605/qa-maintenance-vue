<template>
  <div class="Nlc">
    <div class="container-fluid" style="margin: 15px 0 0 0">
      <form id="uploadId">
        <div class="input-group">
          <span class="input-group-addon">Training CSV File</span>
          <input type="file" id="fileId" name="training-csv" class="form-control">
          <span class="input-group-btn">
                <button id="createBtnId" type="button" class="btn btn-primary">
                    <span class="glyphicon glyphicon-upload" aria-hidden="true"></span> Create
                </button>
            </span>
        </div>
      </form>
      <br>

      <form id="classifyFormId">
        <table id="classifierTableId" class="table table-bordered table-striped table-hover">
          <thead>
          <tr>
            <th></th>
            <th>classifier_id</th>
            <th>name</th>
            <th>language</th>
            <th>created</th>
            <th>status</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">
              <input type="radio" id="id" name="classifierRadio" value="xxxxxxxx" checked="checked">
            </td>
            <td>AA</td>
            <td>BB</td>
            <td>CC</td>
            <td>DD</td>
            <td>available</td>
            <td class="text-center">
              <a href="#"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a>
            </td>
          </tr>
          <% } %>
          </tbody>
        </table>

        <div class="input-group">
          <input type="text" id="textId" class="form-control" placeholder="テキストを入力してください。">
          <span class="input-group-btn">
            <button type="submit" class="btn btn-default" id="classifyBtnId">
                <span class="glyphicon glyphicon-search" aria-hidden="true"></span> Classify
            </button>
        </span>
        </div>
      </form>
      <br>

      <ul class="nav nav-tabs nav-justified">
        <li class="active"><a href="#jsonTabId" data-toggle="tab">Result JSON</a></li>
        <li><a href="#tableTabId" data-toggle="tab">Table</a></li>
      </ul>
      <br>
      <div id="tabId" class="tab-content">
        <div class="tab-pane in active" id="jsonTabId">
          <div id="resultJsonId"></div>
        </div>
        <div class="tab-pane" id="tableTabId">
          <div id="resultTableId"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nlc',
    data: () => {
      return {
        msg: 'Welcome to Answer'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
