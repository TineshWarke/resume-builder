interface Props {
    onSelect: (template: string) => void;
}

const TemplateSelector: React.FC<Props> = ({ onSelect }) => {
    const templates = ['Classic', 'Modern'];

    return (
        <div className="template-selector flex gap-4">
            {templates.map((template) => (
                <button
                    key={template}
                    className="btn"
                    onClick={() => onSelect(template)}
                >
                    {template}
                </button>
            ))}
        </div>
    );
};

export default TemplateSelector;
