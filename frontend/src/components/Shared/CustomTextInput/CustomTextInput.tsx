import {
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    FormLabel,
    Text,
    Select,
} from "@chakra-ui/react";
import Icon from "../Icon/Icon";
import "./CustomTextInput.scss";

type CustomTextInputProps = {
    label: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement >) => void;
    // HTMLSelectElement
    value: string;
    type: "email" | "date" | "password" | "name" | "phone_number" | "select";
    required?: boolean;
    placeholder?: string;
    options?: { label: string; value: string }[]; // Added for dropdown options
};

const CustomTextInput = ({
    label,
    className,
    onChange,
    value,
    type,
    required,
    placeholder,
    options, // Adding options for select
}: CustomTextInputProps) => {
    const getInputIcon = () => {
        if (type === "email") {
            return <Icon name="bxl-gmail" />;
        } else if (type === "password") {
            return <Icon name="bxs-lock-open-alt" />;
        } else if (type === "date") {
            return <Icon name="bxs-calendar" />;
        } else if (type === "name") {
            return <Icon name="bxs-user-rectangle" />;
        } else if (type === "phone_number") {
            return <Icon name="bxs-phone" />;
        } else {
            return null;
        }
    };

    return (
        <FormControl className={`input-container ${className ? className : ""}`}>
            <FormLabel className="input-label">
                {label}
                {required && (
                    <Text as={"span"} className={"required-indicator"}>
                        *
                    </Text>
                )}
            </FormLabel>
            <InputGroup>
                <InputLeftElement
                    pointerEvents={"none"}
                    height={"100%"}
                    opacity={0.2}
                    marginLeft={"10px"}
                >
                    {getInputIcon()}
                </InputLeftElement>

                {type === "select" ? (
                    <Select
                        className="input-area"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        paddingLeft={"0px"}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                ) : (
                    <Input
                        className="input-area"
                        onChange={onChange}
                        value={value}
                        type={type}
                        placeholder={placeholder}
                        paddingLeft={"60px"}
                    />
                )}
            </InputGroup>
        </FormControl>
    );
};

export default CustomTextInput;
