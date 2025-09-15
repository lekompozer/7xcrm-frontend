# CustomerDetailsModal - Reusable Component

This document explains how to use the shared `CustomerDetailsModal` component across different pages in the 7x CRM Admin application.

## Component Location
```
src/components/modals/CustomerDetailsModal.tsx
```

## Type Definition
```
src/types/customer.ts
```

## Usage

### 1. Import the Component and Types

```tsx
import CustomerDetailsModal from '@/components/modals/CustomerDetailsModal';
import { Customer } from '@/types/customer';
```

### 2. Add State Management

```tsx
const [showCustomerModal, setShowCustomerModal] = useState(false);
const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
```

### 3. Create Handler Functions

```tsx
// Handle opening customer details modal
const handleViewCustomer = (customerId: number) => {
    // Get customer data from your data source
    const customer = customerDetails[customerId] || yourCustomerData;
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
};

// Handle closing customer modal
const handleCloseCustomerModal = () => {
    setShowCustomerModal(false);
    setSelectedCustomer(null);
};

// Handle saving customer data (optional)
const handleSaveCustomer = (customer: Customer) => {
    // Your save logic here
    console.log('Saving customer:', customer);
    // API call to save customer data
    // updateCustomer(customer);

    setShowCustomerModal(false);
    setSelectedCustomer(null);
};
```

### 4. Make Customer Names Clickable

Update your table to make customer names clickable:

```tsx
// In your table component
<div
    className="text-sm font-medium text-blue-600 hover:text-blue-900 hover:underline cursor-pointer"
    onClick={() => onViewCustomer(customer.id)}
>
    {customer.name}
</div>
```

### 5. Add the Modal to Your JSX

```tsx
return (
    <div>
        {/* Your existing content */}

        {/* Customer Detail Modal */}
        <CustomerDetailsModal
            isOpen={showCustomerModal}
            onClose={handleCloseCustomerModal}
            customer={selectedCustomer}
            onSave={handleSaveCustomer}  // Optional - for editing
            readonly={false}             // Optional - set to true for read-only mode
        />
    </div>
);
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | `boolean` | Yes | Controls modal visibility |
| `onClose` | `() => void` | Yes | Function to close modal |
| `customer` | `Customer \| null` | Yes | Customer data to display |
| `onSave` | `(customer: Customer) => void` | No | Function to save changes |
| `readonly` | `boolean` | No | Set to true for read-only mode (default: false) |

## Customer Data Structure

Your customer data should match the `Customer` interface:

```tsx
interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    company?: string;
    joinDate?: string;
    totalSpent?: string;
    source?: string;
    referrer?: string;
    notes?: string;
}
```

## Examples

### Read-Only Mode (Marketing Services)
```tsx
<CustomerDetailsModal
    isOpen={showCustomerModal}
    onClose={handleCloseCustomerModal}
    customer={selectedCustomer}
    readonly={true}
/>
```

### Editable Mode (Subscription Management)
```tsx
<CustomerDetailsModal
    isOpen={showCustomerModal}
    onClose={handleCloseCustomerModal}
    customer={selectedCustomer}
    onSave={handleSaveCustomer}
/>
```

## Features

- **Two Tabs**: Information and Source
- **Form Validation**: Automatic form state management
- **Responsive Design**: Works on all screen sizes
- **Blur Background**: Modern modal styling with backdrop blur
- **Editable/Read-only Modes**: Configurable based on usage
- **Consistent Styling**: Matches application design system

## Implementation Status

✅ **Subscription Management**: Fully implemented
🔄 **Marketing Services**: Ready for implementation
🔄 **Other Pages**: Can be added as needed

## Next Steps

1. Update Marketing Services table to make customer names clickable
2. Add customer detail functionality to other pages as needed
3. Extend Customer interface if additional fields are required
