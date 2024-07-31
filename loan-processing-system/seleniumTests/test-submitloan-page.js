const { Builder, By, until } = require('selenium-webdriver');

(async function submitForm() {
  // Configure WebDriver (using Chrome in this example)
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to the URL where the form is located
    await driver.get('http://localhost:4200/submitloan'); // Replace with your actual URL
    console.log('Navigated to the form page.');

    // Wait for the form to be present and visible
    await driver.wait(until.elementLocated(By.id('form')), 10000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id('form'))), 10000);
    console.log('Form is visible.');

    // Fill out the form
    await driver.findElement(By.id('firstName')).sendKeys('John');
    await driver.findElement(By.id('middleName')).sendKeys('A');
    await driver.findElement(By.id('lastName')).sendKeys('Doe');
    await driver.findElement(By.id('dateOfBirth')).sendKeys('1990-01-01');
    await driver.findElement(By.id('maritalStatus')).sendKeys('Single');
    await driver.findElement(By.id('ssnNumber')).sendKeys('123-45-6789');
    await driver.findElement(By.id('loanAmount')).sendKeys('10000');
    await driver.findElement(By.id('loanPurpose')).sendKeys('Personal Loan');
    await driver.findElement(By.id('description')).sendKeys('This is a test description.');

    // Address fields
    await driver.findElement(By.id('addressLine1')).sendKeys('123 Main St');
    await driver.findElement(By.id('addressLine2')).sendKeys('Apt 4B');
    await driver.findElement(By.id('city')).sendKeys('Metropolis');
    await driver.findElement(By.id('state')).sendKeys('NY');
    await driver.findElement(By.id('postalCode')).sendKeys('56017');
    console.log('Address fields filled out.');

    // Contact information
    await driver.findElement(By.id('phoneHome')).sendKeys('1234567890');
    await driver.findElement(By.id('phoneOffice')).sendKeys('1234567890');
    await driver.findElement(By.id('phoneMobile')).sendKeys('1234567890');
    await driver.findElement(By.id('emailAddress')).sendKeys('john.doe@example.com');
    console.log('Contact information filled out.');

    // Employment details
    await driver.findElement(By.id('employerName')).sendKeys('Tech Corp');
    await driver.findElement(By.id('annualSalary')).sendKeys('80000');
    await driver.findElement(By.id('workExperienceYears')).sendKeys('5');
    await driver.findElement(By.id('workExperienceMonths')).sendKeys('6');
    await driver.findElement(By.id('designation')).sendKeys('Software Engineer');
    await driver.findElement(By.id('employerAddressLine1')).sendKeys('456 Elm St');
    await driver.findElement(By.id('employerAddressLine2')).sendKeys('Suite 300');
    await driver.findElement(By.id('employerCity')).sendKeys('Metropolis');
    await driver.findElement(By.id('employerState')).sendKeys('NY');
    await driver.findElement(By.id('employerPostalCode')).sendKeys('56017');
    console.log('Employment details filled out.');

    // Wait for the submit button to be visible and enabled
    let submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await driver.wait(until.elementIsVisible(submitButton), 10000);
    console.log('Submit button is visible.');

    // Check if the submit button is enabled
    if (await submitButton.isEnabled()) {
      await submitButton.click();
      console.log('Submit button clicked.');
    } else {
      console.error('Submit button is not enabled.');
    }

    await driver.sleep(10000);
    console.log("form submitted");

    // Verify the success message
    let successMsgHeading = await driver.wait(until.elementLocated(By.id('successMsgHeading')), 10000);
    await driver.wait(until.elementIsVisible(successMsgHeading), 10000);

    let successMsgHeadingText = await successMsgHeading.getText();
    if (successMsgHeadingText !== 'Application Submitted Successfully') {
        throw new Error(`Success message heading text mismatch: expected 'Application Submitted Successfully', got '${successMsgHeadingText}'`);
    }
    console.log(`Success message heading verified: ${successMsgHeadingText}`);

    let successMsgPara = await driver.wait(until.elementLocated(By.id('successMsgPara')), 10000);
    await driver.wait(until.elementIsVisible(successMsgPara), 10000);

    let successMsgParaText = await successMsgPara.getText();
    if (successMsgParaText !== 'CONGRATULATIONS !!!! your application is submitted successfully. Our automated system will determine if your application is accepted or not.') {
        throw new Error(`Success message paragraph text mismatch: expected 'CONGRATULATIONS !!!! your application is submitted successfully. Our automated system will determine if your application is accepted or not.', got '${successMsgParaText}'`);
    }
    console.log(`Success message paragraph verified: ${successMsgParaText}`);

    await driver.sleep(10000);

    // Verify and click the home button
    let homeButton = await driver.wait(until.elementLocated(By.id('home')), 10000);
    await driver.wait(until.elementIsVisible(homeButton), 10000);
    let homeButtonText = await homeButton.getText();
    if (homeButtonText !== 'Home') {
        throw new Error(`Home button text mismatch: expected 'Home', got '${homeButtonText}'`);
    }
    console.log(`Home button text verified: ${homeButtonText}`);

    // Verify and click the view applications button
    let viewApplicationsButton = await driver.wait(until.elementLocated(By.id('viewApplications')), 10000);
    await driver.wait(until.elementIsVisible(viewApplicationsButton), 10000);
    let viewApplicationsButtonText = await viewApplicationsButton.getText();
    if (viewApplicationsButtonText !== 'View Applications') {
        throw new Error(`View applications button text mismatch: expected 'View Applications', got '${viewApplicationsButtonText}'`);
    }
    console.log(`View applications button text verified: ${viewApplicationsButtonText}`);


    await homeButton.click();
    await driver.wait(until.urlIs('http://localhost:4200/'), 10000); // Adjust URL as needed
    console.log('Navigated to home page.');

    
    await driver.navigate().back();
    console.log('Returned to the form page.');

    // await driver.sleep(20000);

    // await viewApplicationsButton.click();
    // await driver.wait(until.urlContains('/viewapplications'), 10000); // Adjust URL as needed
    // console.log('Navigated to view applications page.');
    
    // await driver.navigate().back();
    // console.log('Returned to the form page.');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Adding delay to view results before quitting
    await driver.sleep(3000);

    // Quit the driver
    await driver.quit();
    console.log('WebDriver quit.');
  }
})();
