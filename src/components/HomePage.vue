<script setup>
import EmployeeComponent from '../components/EmployeeComponent.vue'
import JobComponent from '../components/JobComponent.vue'
import ProjectComponent from '../components/ProjectComponent.vue'
</script>


<template>
  <div>
    <apexchart
      class="chart"
      ref="chart"
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  <employee-component isShortened="true"></employee-component>
  <job-component isShortened="true"></job-component>
  <project-component isShortened="true"></project-component>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import EmployeeService from "../services/EmployeeService";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  name: "HomePage",
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          type: "category",
        },
      },
      series: [
        {
          data: [],
        },
      ],
    };
  },
  employees: [],
  jobs: [],
  jobData: [],
  methods: {
    getEmployees() {
      EmployeeService.getEmployees().then((response) => {
        this.employees = response.data;
        let dict = new Object();
        for (let i = 0; i < this.employees.length; i++) {
          let job = dict[this.employees[i].job.jobName];
          if (job != null) {
            dict[this.employees[i].job.jobName] =
              dict[this.employees[i].job.jobName] + 1;
          } else {
            dict[this.employees[i].job.jobName] = 1;
          }
        }
        let newData = [];
        for (let property in dict) {
          newData.push({ x: property, y: dict[property] });
        }

        this.series = [
          {
            data: newData,
          },
        ];
      });
    },
  },
  created() {
    this.getEmployees();
  },
};
</script>

<style>
.chart {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
}
</style>
