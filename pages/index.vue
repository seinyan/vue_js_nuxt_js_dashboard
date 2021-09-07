<template>
  <Grid ref="grid"

        :data-items="getData"
        :edit-field="'inEdit'"
        @rowclick="rowClick"
        @itemchange="itemChange"
        :columns="columns">
<!--    :style="{height: '320px'}"-->
    <grid-toolbar>
      <div @click="closeEdit">
        <button title="Add new" class="k-button k-primary" @click='addRecord' >
          Add new
        </button>
      </div>
    </grid-toolbar>
  </Grid>
</template>
<script>
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';

export default {
  name: "index",
  components: {
    'Grid': Grid,
    'grid-toolbar': GridToolbar
  },
  data: function () {
    return {
      updatedData: [],
      editID: null,
      group: [ { field: 'UnitsInStock' } ],
      expandedItems: [],
      columns: [
        { field: 'ProductID', editable: false, title: 'ID', width: '80px' },
        { field: 'ProductName', title: 'Name' },
        { field: 'FirstOrderedOn', editor: 'date', title: 'First Ordered', format: '{0:d}' },
        { field: 'UnitsInStock', title: 'Units',  width: '150px', editor: 'numeric' },
        { field: 'Discontinued', title: 'Discontinued',  editor: 'boolean' }
      ],
      gridData: [{
        "ProductID": 1,
        "ProductName": "Chai",
        "UnitsInStock": 39,
        "Discontinued": false,
        "FirstOrderedOn": new Date(1996, 8, 20)
      }, {
        "ProductID": 2,
        "ProductName": "Chang",
        "UnitsInStock": 17,
        "Discontinued": false,
        "FirstOrderedOn": new Date(1996, 7, 12)
      }, {
        "ProductID": 3,
        "ProductName": "Aniseed Syrup",
        "UnitsInStock": 13,
        "Discontinued": false,
        "FirstOrderedOn": new Date(1996, 8, 26)
      }, {
        "ProductID": 4,
        "ProductName": "Chef Anton's Cajun Seasoning",
        "UnitsInStock": 53,
        "Discontinued": false,
        "FirstOrderedOn": new Date(1996, 9, 19)
      }]
    };
  },
  computed: {
    getData() {
      return this.gridData.map(
        (item) => Object.assign({ inEdit: item.ProductID === this.editID}, item));
    }
  },
  methods: {
    itemChange: function (e) {
      console.log('itemChange')

      console.log(e.dataItem)

      const data = this.gridData.slice();
      const index = data.findIndex(d => d.ProductID === e.dataItem.ProductID);
      data[index] = { ...data[index], [e.field]: e.value };
      this.gridData = data;
      if(event.dataItem){
        event.dataItem[e.field] = e.value;
      }
    },
    rowClick: function (e) {
      console.log('rowClick')
      this.editID = e.dataItem.ProductID;
      e.dataItem.inEdit = true;
    },
    closeEdit(e) {
      console.log('closeEdit')
      console.log(e)
      if (e.target === e.currentTarget) {
        console.log('e.target === e.currentTarget ')
        this.editID = null;
      }
      else {
        console.log('console e.target === e.currentTarget ')
      }
    },
    addRecord() {
      console.log('addRecord')
      const newRecord = { ProductID: this.gridData.length + 1 };
      const data = this.gridData.slice();
      data.unshift(newRecord);
      this.gridData = data;
      this.editID = newRecord.ProductID;
    }
  }
};

</script>
