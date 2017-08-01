using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CellularAutomata.Utilities;

namespace CellularAutomata
{
    public class CellularAutomata
    {
        int _rule;
        List<int> _ruleBinList;
        Dictionary<string, bool> _rules;

        public CellularAutomata(int rule)
        {
            if (rule < 0 || rule > 255) throw new Exception("Rule must be in the range [0, 255]");

            _rule = rule;
            _ruleBinList = BinaryUtilities.ToBinArray(rule, 8);

            var cellPermutations = Enumerable.Range(0, 7).Select(index => BinaryUtilities.ToBinArray(index, 3)).ToList();
            for (var rulePermutationIndex = 0; rulePermutationIndex < cellPermutations.Count; rulePermutationIndex++)
            {
                _rules[string.Join(string.Empty, cellPermutations[rulePermutationIndex])] = _ruleBinList[_ruleBinList.Count - rulePermutationIndex - 1] === 1;
            }

        }

        public bool Check(List<int> ar)
        {
            if (ar.Count != 3) throw new Exception("List must have three indices to be checked.");
            return _rules[string.Join(string.Empty, ar)];
        }

        public List<int> EvolveRow(List<int> row) {
            return row.Select()
        }
    }
}
