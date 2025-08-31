// 代码生成时间: 2025-09-01 00:42:44
import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import FileSaver from 'file-saver';
import { v4 as uuidv4 } from 'uuid';

export default class TextFileAnalyzer extends Ember.Component {
  @service fileReader; // Service to handle file reading
  @service analytics; // Service to handle file analysis
  @service fileWriter; // Service to handle file writing
  @tracked fileContents = ''; // Tracked property to store file content
  @tracked error = null; // Tracked property to store any errors
  @tracked analysisResults = null; // Tracked property to store analysis results

  // Function to handle file input change
  @action
  handleFileInputChange(event) {
    const file = event.target.files[0];
    if (!file) {
      this.error = 'No file selected.';
      return;
    }
    this.readFile(file);
  }

  // Function to read the file content
  readFile(file) {
    this.fileReader.read(file)
      .then((contents) => {
        this.fileContents = contents;
        this.error = null;
        this.analyzeText();
      }).catch((error) => {
        this.error = error;
        this.fileContents = '';
      });
  }

  // Function to analyze the text content of the file
  analyzeText() {
    try {
      this.analysisResults = this.analytics.analyze(this.fileContents);
    } catch (error) {
      this.error = error.message;
      this.analysisResults = null;
    }
  }

  // Function to download the analysis results
  @action
  downloadResults() {
    if (!this.analysisResults) {
      this.error = 'No analysis results to download.';
      return;
    }
    const filename = `analysis-results-${uuidv4()}.txt`;
    const blob = new Blob([this.analysisResults], { type: 'text/plain' });
    FileSaver.saveAs(blob, filename);
  }
}
