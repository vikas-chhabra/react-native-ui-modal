<p align="center">
  <img height="400" src="https://github.com/vikas-chhabra/react-native-ui-modal/raw/master/.github/demo.gif" alt="react-native-ui-modal">
</p>

## Installation

```console
npm install react-native-ui-modal
# or
yarn add react-native-ui-modal
```

## Usage

```js
import UIModal from "react-native-ui-modal";

const MyComponent = () => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  return (
    <UIModal
      isVisible={alertModalVisible}
      transparent={true}
      animationType="fade"
      overlayColor="rgba(0, 0, 0, 0.2)"
      onClose={() => {
        setAlertModalVisible(false);
      }}
      type="alert"
      alertProps={{
        title: "Have a Promo Code?",
        description: ["Please login to reedem", "your promo code"],
        isLoading: false,
        alertTitle: "Login",
      }}
    />
  );
};
```

## Features

- 🔧 Expo Compatible
- 🎨 Extremely Customizable
- 🔧 Flexible config
- 📦 Very lightweight


## Description
react-native-ui-modal is a versatile and customizable modal package for React Native apps. It includes features such as alert, confirmation, congratulations, and loading modals, each with their own unique design and functionality.



## Props

| Name              | Type              | Description                                         | Required | Default            |
| ----------------- | ----------------- | --------------------------------------------------- | -------- | ------------------ |
| isVisible         | boolean           | open/close the modal                                | YES      |                    |
| transparent       | boolean           | modal transparency                                  | NO       | true               |
| type              | enum              | alert, confirmation,congratulations, loading, image | NO       | alert              |
| overlayColor      | string            | Modal background overlay color                      | NO       | rgba(0, 0, 0, 0.2) |
| animationType     | enum              | animation to open the modal(fade, slide)            | NO       | fade               |
| alertProps        | alertProps        | pass if type === 'alert'                            | NO       |                    |
| confirmationProps | confirmationProps | pass if type === 'confirmationProps'                | NO       |                    |
| congProps         | congProps         | pass if type === 'congProps'                        | NO       |                    |
| loadingProps      | loadingProps      | pass if type === 'loadingProps'                     | NO       |                    |

## alertProps

| Name                            | Type              | Description                            | Required | Default |
| ------------------------------- | ----------------- | -------------------------------------- | -------- | ------- |
| alertContainerStyles            | View Style        | styles to modify alert container       | No       |         |
| withImage                       | string            | ex - require('../path_of_your_image')  | NO       |         |
| imageStyles                     | View Style        | styles to modify image in the alert    | NO       |         |
| alertDescriptionContainerStyles | View Style        | Alert description containery styles    | NO       |         |
| title                           | string            | title for the alert                    | NO       |         |
| alertTitleStyles                | Text Style        | styles to modify alert title           | NO       |         |
| description                     | string[]          | description for the alert              | NO       |         |
| alertDescriptionStyles          | Text Style        | styles for description text            | NO       |         |
| alertActionContainerStyles      | View Style        | styles to modify button container      | NO       |         |
| isLoading                       | boolean           | for async actions                      | NO       |         |
| alertActionTextStyles           | View Style        | styles to modify text on action button | NO       |         |
| onPressAction                   | function          | on press of action button              | NO       |         |
| alertTitle                      | string            | action button title                    | NO       |         |
| activityIndicatorProps          | ActivityIndicator | react native activity indicator props  | NO       |         |


## confirmationProps

| Name                            | Type              | Description                            | Required | Default |
| ------------------------------- | ----------------- | -------------------------------------- | -------- | ------- |
| confirmationContainerStyles     | View Style        | styles to modify confirmation container| No       |         |
| actionContainerStyles           | string            | ex - require('../path_of_your_image')  | NO       |         |
| confirmationCancelTitle         | string            | confirmation cancel button title       | NO       |         |
| confirmationDescriptionContainerStyles| View Style  | Confirmation description containery styles    | NO       |         |
| title                           | string            | title for the alert                    | NO       |         |
| titleTextStyles                 | Text Style        | styles to modify text title            | NO       |         |
| description                     | string[]          | description for the alert              | NO       |         |
| confirmationDescriptionStyles   | Text Style        | styles for description container       | NO       |         |
| confirmationActionContainerStyles| View Style        | styles to modify confirm button       | NO       |         |
| isLoading                       | boolean           | for async actions                      | NO       |         |
| confirmationActionTextStyles    | View Style        | styles to modify text on action button | NO       |         |
| onPressAction                   | function          | on press of action button              | NO       |         |
| confirmationTitle               | string            | confirmation button title              | NO       |         |
| activityIndicatorProps          | ActivityIndicator | react native activity indicator props  | NO       |         |
| confirmationCancelContainerStyles| View Style       | Cancel button styles                   | NO       |         |
| withWarning                     | Object            | check withWarning docs below           | NO       |         |

## loadingProps

| Name                            | Type              | Description                            | Required | Default |
| ------------------------------- | ----------------- | -------------------------------------- | -------- | ------- |
| loadingContainerStyles          | View Style        | styles to modify loading container     | No       |         |
| title                           | string            | title below activity indicator         | NO       |         |
| titleStyles                     | Text Style        | styles to modify title                 | NO       |         |
| description                     | string            | description below title                | NO       |         |
| descriptionStyles               | Text Style        | styles to modify description           | NO       |         |
| activityIndicatorProps          | Text Style        | styles to modify text title            | NO       |         |


## congProps

| Name                            | Type              | Description                            | Required | Default        |
| ------------------------------- | ----------------- | -------------------------------------- | -------- | ---------------|
| congContainerStyles             | View Style        | styles to modify container             | No       |                |
| backgroundColor                 | string            | to change background color             | NO       |rgb(247,229,216)|
| baseTextStyles                  | Text Style        | styles to base text                    | NO       |                |
| baseText                        | string            | base text string                       | NO       |                |
| textContainerStyles             | View Style        | styles to modify text container        | NO       |                |
| titles                          | string[]          | strings to show as title can be multiline| NO     |                |
| description                     | string            | single line description string         | NO       |                |
| descriptionTextStyles           | Text Style        | styles to description text             | NO       |                |
| descriptionContainerStyles      | View Style        | styles to modify description container | NO       |                |
| isLoading                       | boolean           | for async actions                      | NO       |                |
| onPressAction                   | function          | on press of action button              | NO       |                |
| actionText                      | string            | action button text string              | NO       |                |
| actionTextStyles                | Text Style        | styles to action button text           | NO       |                |
| actionButtonStyles              | View Style        | styles to modify button container      | NO       |                |


## withWarning
| Name                            | Type              | Description                            | Required | Default        |
| ------------------------------- | ----------------- | -------------------------------------- | -------- | ---------------|
| description                     | string            | description string                     | NO       |                |
