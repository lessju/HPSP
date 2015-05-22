import sys
import os
import re

if __name__ == "__main__":
    from optparse import OptionParser
    p = OptionParser()
    p.set_usage('templater [options]')
    p.set_description(__doc__)
    p.add_option('-r', '--root_dir', dest='root_dir', action='store', default='.',
        help='Root directory containing HTML files')
    p.add_option('-t', '--template', dest='template_file', action='store', default='templates.py',
        help='Template file to load')
    p.add_option('-f', '--file_pattern', dest='file_pattern', action='store', default='_templated',
        help='File name pattern to apply template to')

    opts, args = p.parse_args(sys.argv)

    # Get dictionary from template file
    try:
        patterns = __import__(opts.template_file.replace('.py','')).patterns
    except Exception as e:
        print "Invalid input template file"
        raise e

    # Traverse all directories in root_dir
    for root, dirs, files in os.walk(opts.root_dir):
        # Process all files in directory
        for f in files:
            # Check if file name matches pattern
            if re.search(opts.file_pattern, f):
                # Open file and apply pattern
                content = ''
                with open(os.path.join(root, f)) as curr_file:
                    content = curr_file.read()
                    for pattern in patterns.keys():
                        content = content.replace(pattern, patterns[pattern])
                # Write content no new file
                with open(os.path.join(root,f).replace(opts.file_pattern, ''), 'w') as curr_file:
                    curr_file.write(content)
