#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Node structure for circular linked list
struct Node {
    string name;
    Node* next;
};

// Function to create a new node
Node* createNode(const string& name) {
    Node* node = new Node();
    node->name = name;
    node->next = nullptr;
    return node;
}

// Function to load names into a circular linked list
Node* loadGame(int n, const vector<string>& names) {
    if (n == 0) return nullptr;
    if (n != names.size()) throw runtime_error("Number of names does not match n");

    Node* head = nullptr;
    Node* prev = nullptr;

    for (int i = 0; i < n; ++i) {
        Node* node = createNode(names[i]);
        if (!head) head = node;
        else prev->next = node;
        prev = node;
    }
    prev->next = head; // make it circular

    return head;
}

// Function to print circular linked list
void printList(Node* start) {
    if (!start) return;
    Node* curr = start;
    do {
        cout << curr->name << " ";
        curr = curr->next;
    } while (curr != start);
    cout << endl;
}

// Josephus game function
Node* runGame(Node* start, int k) {
    if (!start) return nullptr;
    if (k <= 0) throw runtime_error("k must be positive");

    Node* curr = start;
    Node* prev = nullptr;

    while (curr->next != curr) { // more than one person left
        // skip k-1 nodes
        for (int i = 0; i < k - 1; ++i) {
            prev = curr;
            curr = curr->next;
        }
        // eliminate curr
        cout << "Eliminated: " << curr->name << endl;
        prev->next = curr->next;
        Node* temp = curr;
        curr = curr->next;
        delete temp;
    }
    return curr; // last person remaining
}

int main() {
    int n, k;
    cout << "Enter number of players: ";
    cin >> n;
    cout << "Enter step count (k): ";
    cin >> k;

    if (n <= 0 || k <= 0) {
        cout << "Invalid input: n and k must be positive integers." << endl;
        return 1;
    }

    cout << "Enter names of players (enter '.' to finish):" << endl;
    vector<string> names;
    string name;
    for (int i = 0; i < n; ++i) {
        cin >> name;
        names.push_back(name);
    }

    Node* startPerson = loadGame(n, names);

    cout << "\nInitial Circle of Players:" << endl;
    printList(startPerson);
    cout << endl;

    Node* winner = runGame(startPerson, k);

    if (winner) {
        cout << "\nWinner is: " << winner->name << "!" << endl;
        delete winner; // clean up last node
    }

    return 0;
}
