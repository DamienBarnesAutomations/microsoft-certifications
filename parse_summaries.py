import os
import re
import json

def parse_summary_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    modules = {}
    # Identify the module name from the first line (e.g., "# Module 1: ...")
    module_match = re.match(r'# (Module \d+): .*', content)
    if not module_match:
        return {}
    
    module_name = module_match.group(1)
    modules[module_name] = {"topics": {}}

    # Split by "## Card"
    cards = re.split(r'## Card \d+: ', content)
    
    for card_content in cards[1:]:
        lines = card_content.split('\n')
        topic_name = lines[0].strip()
        card_body = '\n'.join(lines[1:])
        
        # Split by "### "
        subsections = re.split(r'### ', card_body)
        
        topic_data = {}
        for subsection in subsections:
            if not subsection.strip():
                continue
            
            sub_parts = subsection.split('\n', 1)
            subheading = sub_parts[0].strip()
            sub_content = sub_parts[1].strip() if len(sub_parts) > 1 else ""
            
            # Clean up sub_content: remove trailing "---" if it's the end of a card
            if sub_content.endswith('---'):
                sub_content = sub_content[:-3].strip()
            
            topic_data[subheading] = sub_content
            
        modules[module_name]["topics"][topic_name] = topic_data

    return modules

def main():
    summary_dir = 'dp700/summary'
    modules_data = {}
    
    for i in range(1, 7):
        file_name = f'M{i}.Summary.md'
        file_path = os.path.join(summary_dir, file_name)
        if os.path.exists(file_path):
            module_data = parse_summary_file(file_path)
            modules_data.update(module_data)
        else:
            print(f"Warning: {file_path} not found.")

    # The structure expected by cards.html
    all_data = {
        "title": "Fabric Data Engineer",
        "modules": modules_data
    }

    # Convert to JS format
    js_content = "var DP700_DATA = " + json.dumps(all_data, indent=2) + ";"
    
    with open('cards_dp700.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    print("Successfully wrote cards_dp700.js")

if __name__ == "__main__":
    main()


