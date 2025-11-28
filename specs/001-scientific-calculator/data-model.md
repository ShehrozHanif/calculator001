# Data Model for Scientific Calculator App

This application is a client-side calculator and does not involve complex data models or persistent storage. The primary data entity managed is the calculator's `display` value.

## Entities

### `Display` Value

*   **Type**: `string`
*   **Description**: Represents the current input or calculated result shown on the calculator screen.
*   **Attributes**:
    *   `value`: `string` - The actual text content to be displayed.

## Relationships

*   None. The display value is managed internally by the `Calculator` component.

## Data Flow

*   User input (button clicks, keyboard events) modifies the `display` value.
*   Calculation logic processes the `display` value to produce new results, which then update the `display` value.
*   The `Display` component renders the current `display` value.
