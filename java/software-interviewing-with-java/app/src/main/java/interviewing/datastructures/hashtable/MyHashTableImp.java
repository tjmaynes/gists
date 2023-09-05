package interviewing.datastructures.hashtable;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

interface MyHashTable<K, V> {
    void set(K key, V value);

    Optional<V> get(K key);

    Optional<V> remove(K key);
}

public class MyHashTableImp<K, V> implements MyHashTable<K, V> {
    private List<HashNode<K, V>> data;
    private int numOfBuckets;
    private int size;

    public MyHashTableImp() {
        this.data = new ArrayList(size);
        this.numOfBuckets = 10;
        this.size = 0;

        for (int i = 0; i < numOfBuckets; i++)
            this.data.add(null);
    }

    @Override
    public Optional<V> get(K key) {
        return this.getHashNode(key).map(node -> node.value);
    }

    @Override
    public void set(K key, V value) {
        int bucketIndex = this.getBucketIndex(key);
        HashNode<K, V> head = this.data.get(bucketIndex);

        int hashCode = this.hashify(key);

        while (head != null) {
            if (head.key.equals(key) && head.hashCode == hashCode) {
                head.value = value;
                return;
            }
            head = head.next;
        }

        this.size += 1;

        head = this.data.get(bucketIndex);
        HashNode newNode = new HashNode(key, value, hashCode);
        newNode.next = head;
        this.data.set(bucketIndex, newNode);

        this.resizeIfNeededForNewNode(key, value);
    }

    @Override
    public Optional<V> remove(K key) {
        int bucketIndex = this.getBucketIndex(key);
        HashNode<K, V> head = this.data.get(bucketIndex);

        int hashCode = this.hashify(key);

        HashNode<K, V> previous = null;
        while (head != null) {
            if (head.key.equals(key) && head.hashCode == hashCode) break;

            previous = head;
            head = head.next;
        }

        if (head == null) return Optional.empty();

        this.size -= 1;

        if (previous != null) {
            previous.next = head.next;
        } else {
            this.data.set(bucketIndex, head.next);
        }

        return Optional.of(head.value);
    }

    private Optional<HashNode<K, V>> getHashNode(K key) {
        int bucketIndex = this.getBucketIndex(key);
        HashNode<K, V> head = this.data.get(bucketIndex);
        int hashCode = this.hashify(key);

        while (head != null) {
            if (head.key.equals(key) && head.hashCode == hashCode)
                return Optional.of(head);
            head = head.next;
        }

        return Optional.empty();
    }

    private int getBucketIndex(K key) {
        int index = this.hashify(key) % this.numOfBuckets;
        index = index < 0 ? index * -1 : index;
        return index;
    }

    private int hashify(K key) {
        return Objects.hash(key);
    }

    private void resizeIfNeededForNewNode(K key, V value) {
        int hashCode = this.hashify(key);

        if (((1.0 * this.size) / this.numOfBuckets) >= 0.7) {
            List<HashNode<K, V>> temp = this.data;

            this.data = new ArrayList<>();
            this.numOfBuckets = 2 * this.numOfBuckets;
            this.size = 0;

            for (int i = 0; i < numOfBuckets; i++)
                this.data.add(null);

            for (HashNode<K, V> headNode : temp) {
                while (headNode != null) {
                    if (headNode.key.equals(key) && headNode.hashCode == hashCode) {
                        headNode.value = value;
                        break;
                    }
                    headNode = headNode.next;
                }
            }
        }
    }
}
